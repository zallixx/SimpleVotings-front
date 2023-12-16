import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ReactLoading from "react-loading";

const VoteHistoryPage = () => {
    let {authTokens} = useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);
    const [questions, setQuestions] = useState({});
    const navigate = useNavigate();

    const fetchVotes = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/vote-history/', {
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
            const response = await fetch(`http://127.0.0.1:8000/api/polls/${id}/`, {
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
        fetchVotes().then(() => {
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
                        <div className="list-group list-group-checkable h-100 w-100 rounded">
                            {Object.values(questions).map((question) => (
                                <div className="list-group-item list-group-item-action weak_blue rounded">
                                    {/* eslint-disable-next-line  */}
                                    <a onClick={() => navigate(`/polls/${question.id}/results/`)}>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{'Вы приняли участние в опросе: ' + question.question}</h5>
                                            <small>Нажмите, чтобы посмотреть результат</small>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VoteHistoryPage;