import React, {useContext, useState} from 'react';
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

const NewPollPage = () => {
    const [pollType, setPollType] = useState(1);
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['', '']);
    let {authTokens} = useContext(AuthContext);
    const navigate = useNavigate();

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
        if (answers.length < 11) {
            setAnswers([...answers, '']);
        }
        else {
            alert('Максимум 10 вариантов ответа!');
        }
    };

    const handleDelAnswer = () => {
        if (answers.length > 2) {
            setAnswers(answers.slice(0, -1));
        }
        else {
            alert('Минимум 2 варианта ответа!');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (event.target.type === "submit") {
            if(question === '') {
                alert('Заполните вопрос!');
            }
            else {
                alert("Опрос создан!");
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
                 }).then(() => {
                    navigate('/polls/');
                });
            }
        }};

    return (
        <div className="BasePageCss">
            <div className="body-inner rounded-5">
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
                            <option value={0}>Один из многих</option>
                            <option value={1}>Несколько из многих</option>
                            <option value={2}>Дискретный</option>
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
                <button className="btn btn-primary" onClick={handleSubmit}>Создать опрос</button>
            </div>
        </div>
    );
}

export default NewPollPage;