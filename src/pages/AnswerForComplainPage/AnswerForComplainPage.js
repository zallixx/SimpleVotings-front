import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/AuthContext";
import ReactLoading from "react-loading";
import {useNavigate, useParams} from "react-router-dom";
import {Form} from "react-bootstrap";

const AnswerForComplainPage = () => {
    let {authTokens} = useContext(AuthContext);
    let {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [complain, setComplain] = useState();
    const [AnswerText, setAnswerText] = useState('');
    const params = useParams();

    const fetchComplain = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/complains/' + params.id + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                setComplain(data);
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const sendAnswerToComplain = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/complains/' + params.id + '/set_answer/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body: JSON.stringify({
                    'response': AnswerText
                })
            });
            if (response.status === 200) {
                alert('Ответ отправлен');
                window.location.reload();
            } else {
                alert('Что-то пошло не так');
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchComplain().then(
            () => setLoading(false)
        );
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
                    <h3 className="mb-1">
                        {complain[0].text}
                        {" - "}
                        <a onClick={() => navigate('/polls/' + complain[0].poll)} style={{cursor: 'pointer', color: 'blue'}}>Ссылка на опрос</a>
                    </h3>
                    <hr/>

                    <div className="d-flex flex-column align-items-center">
                        {user.is_admin && complain[0].response === '' ? (
                            <Form onSubmit={sendAnswerToComplain}>
                                <textarea type="text" className="form-control" placeholder="Ответ на жалобу" required maxLength={180}
                                          style={{height: '125px', width: '250px', resize: 'none'}} onInput={(e) => setAnswerText(e.target.value)}
                                />
                                <button className="btn btn-primary" type="submit" onClick={null}>Отправить</button>
                            </Form>
                        ) : (
                            <>
                                <h6>Ответ:</h6>
                                <p className="mb-2">{complain[0].response}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnswerForComplainPage;