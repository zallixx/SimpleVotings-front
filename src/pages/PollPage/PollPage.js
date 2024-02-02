import React, {useContext, useEffect, useState} from "react";

import './PollPage.css';
import {useNavigate, useParams} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {Button, Form, FormGroup} from "react-bootstrap";
import ReactLoading from 'react-loading';
import Modal from "react-bootstrap/Modal";

const PollsPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [poll, setPoll] = useState([]);
    const navigate = useNavigate();
    let {authTokens} = useContext(AuthContext);
    let {user} = useContext(AuthContext)
    user = user === null ? {username: ''} : user
    const params = useParams();
    const [author_name, setAuthorName] = useState('');
    const [isEditMode, setEditMode] = useState(false);
    const [isComplainMode, setComplainMode] = useState(false);
    const [complainText, setComplainText] = useState('');

    const fetchPoll = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/polls/' + params.id + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                console.log(data)
                setPoll(data);
                setAuthorName(data.author_name);
                setLoading(false);
            } else {
                navigate('/polls');
            }
        } catch (error) {
            alert(error)
        }

    };

    const vote = async (e) => {
        e.preventDefault();
        if (user.username === "") {
            alert("Вы не авторизованы");
        }
        else {
            const choices = Array.from(e.target.form.elements).filter(el => (el.checked && (el.getAttribute('type') === 'checkbox' || el.getAttribute('type') === 'radio'))).map(el => el.value);
            try {
                const response = await fetch('http://127.0.0.1:8000/api/polls/' + params.id + '/vote/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access),
                    },
                    body: JSON.stringify({
                        'choices': choices
                    })
                });
                const data = await response.json();
                if (response.status === 201) {
                    navigate('/polls/' + params.id + '/results');
                } else {
                    alert(data);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const discreteAnswers = ['Да','Нет']
        let toServer = {};
        if (poll.question) {
            toServer.question = poll.question
        }
        if (poll.choices) {
            toServer.choices = (poll.type_voting === "2" || poll.type_voting === 2) ? discreteAnswers : poll.choices;
        }
        if (poll.type_voting) {
            toServer.type_voting = poll.type_voting
        }
        try {
            fetch('http://127.0.0.1:8000/api/polls/' + params.id + '/edit/', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body: JSON.stringify(toServer),
            }).then((response) => {
                if (response.status === 200) {
                    alert("Опрос успешно отредактирован");
                    window.location.reload();
                }
                else {
                    alert("Произошла ошибка при редактировании опроса. Может быть у вас присутвуют одинаковые варианты ответов.");
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const toggleEditMode = () => {
        setEditMode(!isEditMode);
    };

    useEffect(() => {
        fetchPoll()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (isLoading) {
        return (
            <ReactLoading className="position-fixed top-50 start-50 translate-middle h3" height={'6%'} width={'6%'}
                          type="bubbles" color="#505253"/>
        )
    }

    let complain = (e) => {
        e.preventDefault();
        if(user.username === "") {
            alert("Вы не авторизованы")
        }
        else {
            try {
                 fetch('http://127.0.0.1:8000/api/polls/' + params.id + '/complain/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access),
                    },
                    body: JSON.stringify({
                        'text': complainText
                    })
                }).then(() => navigate('/polls'))
            } catch (error) {
                console.error(error);
            }
        }
    }

    let deletePoll = async () => {
        if (window.confirm('Вы уверены, что хотите удалить опрос?')) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/polls/' + params.id + '/delete/', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access),
                    },
                });
                console.log(response)
                if (response.status === 200) {
                    navigate('/polls');
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    const handleClose = () => setComplainMode(false);

    const handleAddChoice = (event) => {
        event.preventDefault();
        if (poll.choices.length < 10) {
            setPoll({...poll, choices: [...poll.choices, '']});
        }
        else {
            alert('Максимум 10 вариантов ответа!');
        }
    };

    const handleDelChoice = (event) => {
        event.preventDefault();
        if (poll.choices.length > 2) {
            setPoll({...poll, choices: poll.choices.slice(0, -1)});
        } else {
            alert('Минимум 2 варианта ответа!');
        }
    };

    return (
        <div className="BasePageCss text_color">
            <div key={poll.id} className="body-inner rounded-5">
                <div className="mb-3">
                    <div className="card-body text-lg-start">
                        <img className="img-fluid mb-2" src={`http://localhost:8000${poll.picture}`}/>
                        {user.username === author_name && !isEditMode && !isComplainMode && (
                            <button className="btn btn-primary float-end" onClick={toggleEditMode}>
                                Редактировать
                            </button>
                        )}
                        {user.username !== author_name && !isEditMode && !isComplainMode && user.is_admin && (
                            <button className="btn btn-danger float-end" onClick={deletePoll}>
                                Удалить
                            </button>
                        )}
                        {isEditMode ? (
                            <>
                                <Form onSubmit={handleFormSubmit}>
                                    <div className="d-flex flex-row">
                                        <label className="mt-1">Вопрос: </label>
                                        <input
                                            type="text"
                                            value={poll.question}
                                            style={{marginLeft: '5px'}}
                                            placeholder="Вопрос"
                                            className="form-control mb-2"
                                            onChange={(e) => setPoll((prevPoll) => ({
                                                ...prevPoll,
                                                question: e.target.value
                                            }))}
                                            required
                                        />
                                    </div>
                                    <label>
                                        Тип опроса:
                                        <select className="form-select mb-1 rounded" value={poll.type_voting}
                                                onChange={(e) => {
                                                    setPoll((prevPoll) => ({...prevPoll, type_voting: e.target.value}))
                                                }}>
                                            <option value={"0"}>Один из многих</option>
                                            <option value={"1"}>Несколько из многих</option>
                                            <option value={"2"}>Дискретный</option>
                                        </select>
                                    </label>
                                    <br/>
                                    <label>Варианты ответов: </label>
                                    {poll.type_voting === "2" || poll.type_voting === 2 ? (
                                        <>
                                            <div>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1 rounded disabled"
                                                    placeholder="Ответ"
                                                    value="Нет"
                                                    readOnly
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1 rounded disabled"
                                                    placeholder="Ответ"
                                                    value="Да"
                                                    readOnly
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {poll.choices.map((choice, index) => (
                                                <input
                                                    type="text"
                                                    key={index}
                                                    value={choice}
                                                    className="form-control mb-1"
                                                    onChange={(e) => {
                                                        const updatedChoices = [...poll.choices];
                                                        updatedChoices[index] = e.target.value;
                                                        setPoll((prevPoll) => ({...prevPoll, choices: updatedChoices}));
                                                    }}
                                                    readOnly={poll.type_voting === 2 || poll.type_voting === "2"}
                                                    required
                                                />
                                            ))}
                                            <button className="btn btn-primary" onClick={handleAddChoice}>+</button>
                                            <button className="btn btn-primary" onClick={handleDelChoice}>-</button>
                                        </>
                                    )}
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <Button type="submit" bsStyle="primary" className="fs-5">
                                            Изменить опрос
                                        </Button>
                                    </div>
                                </Form>
                            </>
                        ) : (
                            <>
                                <h3 className="card-title mb-1">{poll.question}</h3>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <p className="card-text">Автор: <a className="author" href=""
                                                                   onClick={() => navigate('/users/' + poll.created_by + '/')}>{author_name}</a>
                                </p>
                                <Form>
                                    {poll.choices.map((choice) => (
                                        <div
                                            className="form-check w-auto h-auto rounded p-1 mb-2 d-flex background_color_of_choice_btns"
                                            key={choice.id}
                                        >
                                            <label className="form-check-label fs-5 fw-normal radio"
                                                   htmlFor={choice.id}>
                                                <input
                                                    className="form-check-input mx-2 border-1 border-dark"
                                                    type={poll.type_voting === 0 ? "radio" : poll.type_voting === 1 ? "checkbox" : "radio"}
                                                    name="choices"
                                                    value={choice}
                                                    id={choice.id}
                                                />
                                                {choice}
                                            </label>
                                        </div>
                                    ))}
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        {user.username === author_name ? (
                                            <button className="btn btn-danger float-end" onClick={deletePoll}>
                                                Удалить
                                            </button>
                                        ) : (
                                            // eslint-disable-next-line
                                            <a onClick={() => setComplainMode(true)}
                                               className="complain fs-5">Пожаловаться</a>
                                        )}
                                        <FormGroup>
                                            <Button type="submit" bsStyle="primary" className="fs-5" onClick={vote}>
                                                Отправить
                                            </Button>
                                        </FormGroup>
                                    </div>
                                </Form>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Modal show={isComplainMode} centered className={"custom-modal-" + localStorage.getItem("theme")} onHide={handleClose}>
                <Form onSubmit={complain}>
                    <Modal.Header className="rounded-top-1 border-0">
                        <Modal.Title>Составление жалобы</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <textarea type="text" className="form-control" placeholder="Текст жалобы"
                                  onInput={(e) => setComplainText(e.target.value)} required
                                  maxLength={180} style={{height: '125px', resize: 'none'}}
                        />
                    </Modal.Body>
                    <Modal.Footer closeButton className="rounded-bottom-1 border-0">
                        <Button variant="danger" type="submit">
                            Отправить жалобу
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Отмена
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default PollsPage;