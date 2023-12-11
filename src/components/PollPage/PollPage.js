import React, {useContext, useEffect, useState} from "react";

import './PollPage.css';
import {useNavigate, useParams} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {Answer, Poll} from "../../components/PollsPage/utils_for_polls/PollClass";
import {Button, Form, FormGroup} from "react-bootstrap";

const PollsPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [poll, setPoll] = useState([]);
    const navigate = useNavigate();
    let {authTokens} = useContext(AuthContext);
    const params = useParams();
    const [selected, setSelected] = useState('');

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
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error(error);
        }
    };

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
    }, []);
    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div className="PollsPage">
            <div key={poll.id} className="auth-inner">
                <p>{poll.question}</p>
                <Form onSubmit={vote}>
                    {poll.choices.map((choice) => (
                        <div className="form-check w-auto h-auto rounded p-3 border border-opacity-100 border-dark">
                            <label className="form-check-label" htmlFor={choice.id}>{choice}
                                <input
                                    className="radio form-check-input"
                                    type="radio"
                                    name="choices"
                                    value={choice}
                                    onChange={(e) => setSelected(e.target.value)}
                                    id={choice.id}
                                />
                            </label>
                        </div>
                    ))}
                    <FormGroup>
                        <Button type="submit" bsStyle="primary">
                            Vote
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        </div>
    );

}

export default PollsPage;