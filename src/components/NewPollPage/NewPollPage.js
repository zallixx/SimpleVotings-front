import React, {useContext, useState} from 'react';

import AuthContext from "../../context/AuthContext";
import {Form} from "react-bootstrap";

const NewPollPage = () => {
    const [pollType, setPollType] = useState(1);
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);
    let {authTokens} = useContext(AuthContext);

    const handlePollTypeChange = (event) => {
        setPollType(event.target.value);
    };

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleAnswerChange = (index, event) => {
        const newAnswers = [...answers];
        newAnswers[index] = event.target.value;
        setAnswers(newAnswers);
    };

    const handleAddAnswer = () => {
        setAnswers([...answers, '']);
    };

    const handleDelAnswer = () => {
        if (answers.length > 1) {
            setAnswers(answers.slice(0, -1));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = {
            type_voting: pollType,
            question: question,
            choices: answers,
        };
        fetch('http://127.0.0.1:8000/api/polls/new/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access),
            },
            body: JSON.stringify(payload),
         })};

    return (
        <Form onSubmit={handleSubmit}>
            <div className="PollsPage">
                <div className="auth-inner rounded-5">
                    <div className="mb-1">
                        <div className="card-body text-lg-start">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Вопрос"
                                value={question}
                                onChange={handleQuestionChange}
                            />
                        </div>
                        <label>
                            Тип опроса:
                            <select className="form-select mb-1 rounded" value={pollType} onChange={handlePollTypeChange}>
                                <option value={1}>Тип 1</option>
                                <option value={2}>Тип 2</option>
                                <option value={3}>Тип 3</option>
                            </select>
                        </label>
                        <br/>
                        <label>
                            Ответы:
                            {answers.map((answer, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        className="form-control mb-1 rounded"
                                        placeholder="Ответ"
                                        value={answer}
                                        onChange={(event) => handleAnswerChange(index, event)}
                                    />
                                </div>
                            ))}
                            <button className="btn btn-primary" onClick={handleAddAnswer}>
                                +
                            </button>
                            <button className="btn btn-primary" onClick={handleDelAnswer}>
                                -
                            </button>
                        </label>
                    </div>
                    <br/>
                    <button className="btn btn-primary" type="submit">Создать опрос</button>
                </div>
            </div>
        </Form>
    );
}

export default NewPollPage;