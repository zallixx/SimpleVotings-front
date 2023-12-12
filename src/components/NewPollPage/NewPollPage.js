import React, {useContext, useEffect, useState} from "react";

import './NewPollPage.css';
import {useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {Answer, Poll} from "../../components/PollsPage/utils_for_polls/PollClass";

const NewPollPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [polls, setPolls] = useState([]);
    const navigate = useNavigate();
    const [pollsLenght, setPollslenght] = useState(0);
    let {authTokens} = useContext(AuthContext);

    const fetchPolls = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/polls/new/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
            });
            const data = await response.json();
            if (response.status === 200) {

            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPolls().then(() => setLoading(false));
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return null;

}

export default NewPollPage;