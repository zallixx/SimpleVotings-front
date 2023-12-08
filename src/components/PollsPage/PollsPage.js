import React, {useContext, useEffect, useState} from "react";

import './PollsPage.css';
import {useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {Answer, Poll} from "../../components/PollsPage/utils_for_polls/PollClass";

const PollsPage = () => {
    const [polls, setPolls] = useState([]);
    const navigate = useNavigate();
    let {authTokens} = useContext(AuthContext);

    const fetchPolls = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/polls/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                console.log(data)
                setPolls(data);
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPolls();
    }, []);

    return (
        <div className="PollsPage">
            {polls.map((poll) => (
                <div key={poll.id} className="auth-inner">
                    <a onClick={() => navigate(`/poll/${poll.id}`)}>{poll.question}</a>
                </div>
            ))}
        </div>
    );

}

export default PollsPage;