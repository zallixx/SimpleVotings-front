import React, {useContext, useState} from 'react';

import AuthContext from "../../context/AuthContext";

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
        <div>
            <h1>Create New Poll</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Тип опроса:
                    <select value={pollType} onChange={handlePollTypeChange}>
                    <option value={1}>Тип 1</option>
                    <option value={2}>Тип 2</option>
                    <option value={3}>Тип 3</option>
                    </select>
                </label>
                <br/>
                <label>
                    Вопрос:
                    <input type="text" value={question} onChange={handleQuestionChange} />
                </label>
                <br/>
                <label>
                    Ответы:
                    {answers.map((answer, index) => (
                        <div key={index}>
                            <input
                            type="text"
                            value={answer}
                            onChange={(event) => handleAnswerChange(index, event)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddAnswer}>
                        +
                    </button>
                </label>
                <br/>
                <button type="submit">Создать опрос</button>
            </form>
        </div>
    );
}

export default NewPollPage;