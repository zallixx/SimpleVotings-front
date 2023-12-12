import React, {useContext, useEffect, useState} from "react";

import './EditPollPage.css';
import {useParams} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {Form} from "react-bootstrap";

const EditPollPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [poll, setPoll] = useState([]);
    let {authTokens} = useContext(AuthContext);
    const params = useParams();

    const fetchPoll = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/polls/' + params.id + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                setPoll(data);
            } else {
                alert('-1');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleFormSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/polls/' + params.id + '/edit/', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body: JSON.stringify({ question: poll.question, choices: poll.choices }),
            });
            if (response.status === 200) {
                alert("0");
            } else {
                alert("-1");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPoll().then(
            () => setLoading(false)
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <Form onSubmit={handleFormSubmit}>
            <div className="PollsPage">
                <div key={poll.id} className="auth-inner rounded-5">
                    <div className="mb-3">
                        <div className="card-body text-lg-start">
                            <h3 className="card-title mb-1">
                                <input
                                    type="text"
                                    value={poll.question}
                                    className="form-control"
                                    onChange={(e) => setPoll((prevPoll) => ({ ...prevPoll, question: e.target.value }))}
                                />
                            </h3>
                        </div>
                    </div>
                    {poll.choices.map((choice, index) => (
                        <input
                            type="text"
                            key={index}
                            value={choice}
                            className="form-control"
                            onChange={(e) => {
                                const updatedChoices = [...poll.choices];
                                updatedChoices[index] = e.target.value;
                                setPoll((prevPoll) => ({ ...prevPoll, choices: updatedChoices }));
                            }}
                        />
                    ))}
                    <br/>
                    <button className="btn btn-primary" type="submit">Изменить</button>
                </div>
            </div>
        </Form>
    );
}

export default EditPollPage;