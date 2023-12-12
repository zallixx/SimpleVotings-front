import React, {useContext, useEffect, useState} from "react";

import './PollsPage.css';
import {useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const PollsPage = () => {
    const [isLoading, setLoading] = useState(true);
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
                setFilteredPolls(data)
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchPolls().then(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPolls, setFilteredPolls] = useState([]);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (searchTerm !== ""){
            const filtered = polls.filter((poll) =>
                poll.question.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredPolls(filtered);
        }
    };

    const formatTimeSinceCreation = (createdAt) => {
        const now = new Date();
        const createdDate = new Date(createdAt);

        const diffInMinutes = Math.floor((now - createdDate) / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInMonths = Math.floor(diffInDays / 30);

        if (diffInMinutes < 20) { return "just now";}
        else if (diffInHours < 1) { return `${diffInMinutes} minutes ago`; }
        else if (diffInDays < 1) { return `${diffInHours} hours ago`; }
        else if (diffInDays < 2) { return `${diffInDays} day ago`; }
        else if (diffInDays < 30) { return `${diffInDays} days ago`; }
        else if (diffInMonths < 2) { return `${diffInMonths} month ago`; }
        else { return `${diffInMonths} months ago`; }
    };


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="PollsPage">
            <div className="auth-wrapper">
                <div className="auth-inner h-100 w-75 position-relative">
                    <input
                        type="search"
                        className="form-control rounded weak-orange"
                        placeholder="Поиск голосований..."
                        aria-label="Search"
                        value={searchTerm}
                        onInput={handleSearch}
                    />
                    <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
                        <div className="list-group list-group-checkable h-100 w-100 rounded">
                            {filteredPolls.length === 0 ? (
                                <div>
                                    <label>Похоже, что опросов по-вашему поиску нет... Перепроверьте поиск или </label>
                                    {' '}
                                    <a href={`/polls/new/`}>создайте новый опрос</a>.
                                </div>
                            ) : (
                                filteredPolls.map((poll) => (
                                    <button
                                    onClick={() => navigate(`/polls/${poll.id}`)}
                                    key={poll.id}
                                    className="list-group-item list-group-item-action weak_blue"
                                    >
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{poll.question}</h5>
                                            <small>{formatTimeSinceCreation(poll.created_at)}</small>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default PollsPage;