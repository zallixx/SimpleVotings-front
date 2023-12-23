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
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                setPoll(data);
                setAuthorName(await get_author_name(data.created_by));
                setLoading(false);
            } else {
                navigate('/polls');
            }
        } catch (error) {
            alert(error)
        }
    };

    const get_author_name = async (id) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/' + id + '/username/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                return data;
            } else {
                alert('Something went wrong!');
            }
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    const vote = async (e) => {
        e.preventDefault();
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
    };

    const handleFormSubmit = async () => {
        let toServer = {};
        if (poll.question) {
            toServer.question = poll.question
        }
        if (poll.choices) {
            toServer.choices = poll.choices
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/api/polls/' + params.id + '/edit/', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body: JSON.stringify(toServer),
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
                const data = await response.json();
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

    return (
        <div className="BasePageCss text_color">
            <div key={poll.id} className="body-inner rounded-5">
                <div className="mb-3">
                    <div className="card-body text-lg-start">
                        {user.username === author_name && !isEditMode && !isComplainMode &&(
                            <button className="btn btn-primary float-end background_color_of_primary_btn" onClick={toggleEditMode}>
                                Редактировать
                            </button>
                        )}
                        {isEditMode ? (
                            <>
                                <Form onSubmit={handleFormSubmit}>
                                    <input
                                        type="text"
                                        value={poll.question}
                                        className="form-control mb-2"
                                        onChange={(e) => setPoll((prevPoll) => ({
                                            ...prevPoll,
                                            question: e.target.value
                                        }))}
                                    />
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
                                        />
                                    ))}
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <FormGroup>
                                            <Button type="submit" bsStyle="primary" className="fs-5 background_color_of_primary_btn">
                                                Изменить опрос
                                            </Button>
                                        </FormGroup>
                                    </div>
                                </Form>
                            </>
                        )  : (
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
                                            <Button type="submit" bsStyle="primary" className="fs-5 background_color_of_primary_btn" onClick={vote}>
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
                <Modal.Header className="rounded-top-1 border-0">
                    <Modal.Title>Составление жалобы</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <input type="text" className="form-control" placeholder="Текст жалобы" onInput={(e) => setComplainText(e.target.value)}/>
                    </Modal.Body>
                    <Modal.Footer closeButton className="rounded-bottom-1 border-0">
                        <Button variant="danger" onClick={complain}>
                            Отрпавить жалобу
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Отмена
                        </Button>
                    </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PollsPage;