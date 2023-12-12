import React, {useContext, useEffect, useState} from "react";

import './PollPage.css';
import {useNavigate, useParams} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {Button, Form, FormGroup} from "react-bootstrap";

const PollsPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [poll, setPoll] = useState([]);
    const navigate = useNavigate();
    let {authTokens} = useContext(AuthContext);
    let {user} = useContext(AuthContext)
    const params = useParams();
    const [selected, setSelected] = useState('');
    const [author_name, setAuthorName] = useState('');

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
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error(error);
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
        try {
            const response = await fetch('http://127.0.0.1:8000/api/polls/' + params.id + '/vote/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body: JSON.stringify({
                    'choices': selected
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
        <div className="PollsPage">
            <div key={poll.id} className="auth-inner rounded-5">
                <div className="mb-3">
                    <div className="card-body text-lg-start">
                        {user.username === author_name && (
                            <a href={'/polls/' + poll.id + '/edit/'} className="btn btn-primary float-end">
                                Изменить
                            </a>
                        )}
                        <h3 className="card-title mb-1">{poll.question}</h3>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <p className="card-text">Автор: <a className="author" href=""
                                                           onClick={() => navigate('/users/' + poll.created_by + '/')}>{author_name}</a>
                        </p>
                    </div>
                </div>
                <Form onSubmit={vote}>
                    {poll.choices.map((choice) => (
                        <div
                            className="form-check w-auto h-auto rounded p-1 mb-2 border border-opacity-100 border-dark d-flex">
                            <label className="form-check-label fs-5 fw-normal radio" htmlFor={choice.id}>
                                <input
                                    className="form-check-input mx-2 border-1 border-dark"
                                    type="radio"
                                    name="choices"
                                    value={choice}
                                    onChange={(e) => setSelected(e.target.value)}
                                    id={choice.id}
                                />
                                {choice}
                            </label>
                        </div>
                    ))}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="" onClick={() => navigate('/polls/' + params.id + '/complain/')}
                           className="complain fs-5">Пожаловаться</a>
                        <FormGroup>
                            <Button type="submit" bsStyle="primary" className="fs-5">
                                Отправить
                            </Button>
                        </FormGroup>
                    </div>
                </Form>
            </div>
        </div>
    );

}

export default PollsPage;