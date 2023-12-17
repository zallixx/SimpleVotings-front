import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ReactLoading from "react-loading";

const ComplainsPage = () => {
    let {authTokens} = useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);
    const params = useParams();
    const [user, setUser] = useState({});
    const [questions, setQuestions] = useState({});
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/' + params.id + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                setUser(data);
                if (data.show_history === true) {
                    await fetchVotes();
                }
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchVotes = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/vote-history/?anotherUser=' + params.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                const fetchQuestionPromises = data.map((vote) => fetchQuestion(vote.poll));
                await Promise.all(fetchQuestionPromises);
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchQuestion = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/polls/` + id + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                setQuestions(prevQuestions => ({
                    ...prevQuestions,
                    [data.id]: {question: data.question, id: data.id}
                }));
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUser().then(r => {
            setLoading(false);
        })
    }, []);

    if (isLoading) {
        return (
            <ReactLoading className="position-fixed top-50 start-50 translate-middle h3" height={'6%'} width={'6%'}
                          type="bubbles" color="#505253"/>
        )
    }

    return (
        <div className="BasePageCss">
            <div className="body-wrapper">
                <div className="body-inner h-100 w-75 position-relative">
                    {user.is_public === true ? (
                            <div>
                                <h4 style={{justifyContent: 'center', display: 'flex'}}>Вы просматриваете профиль
                                    пользователя
                                    - {user.username}</h4>
                                <hr/>
                                <div>
                                    {user.avatar === null ? (
                                        <label>Данный пользователь не установил аватар</label>
                                    ) : (
                                        <img src={user.avatar} alt="avatar" width="200" height="200"/>
                                    )
                                    }
                                </div>
                                <hr/>
                                <div>
                                    <p style={{justifyContent: 'center', display: 'flex'}}>
                                        <b>Его цитата - {user.quote}</b>
                                    </p>
                                </div>
                                <hr/>
                                <div>
                                    {user.show_history === true ? (
                                            <div>
                                                <h5> История голосования пользователя</h5>
                                                <div
                                                    className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
                                                    <div className="list-group list-group-checkable h-100 w-100 rounded">
                                                        {Object.values(questions).length > 0 ? (

                                                                Object.values(questions).map((question) => (
                                                                    <div
                                                                        className="list-group-item list-group-item-action weak_blue rounded">
                                                                        {/* eslint-disable-next-line  */}
                                                                        <a onClick={() => navigate(`/polls/${question.id}/results/`)}>
                                                                            <div
                                                                                className="d-flex w-100 justify-content-between">
                                                                                <h5 className="mb-1">{'Принял участние в опросе: ' + question.question}</h5>
                                                                                <small>Нажмите, чтобы посмотреть
                                                                                    результат</small>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                ))
                                                        ) : (
                                                            <div>
                                                                <h5>Данный пользователь не принимал участия в
                                                                    опросах</h5>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        : (
                                            <div>
                                                <h5>Данный пользователь скрыл свою историю голосов</h5>
                                            </div>
                                        )}
                                </div>
                            </div>
                        )
                        : (
                            <h5 style={{justifyContent: 'center', display: 'flex'}}> Кажется, {user.username} скрыл
                                свой профиль.</h5>
                        )}
                </div>
            </div>
        </div>
    );
}

export default ComplainsPage;