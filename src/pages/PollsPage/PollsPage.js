import React, {useContext, useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ReactLoading from "react-loading";
import { MdAccessAlarm } from "react-icons/md";
import { MdPerson } from "react-icons/md";

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
                setPolls(data);
                setFilteredPolls(data);
                setLoading(false)
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPolls();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPolls, setFilteredPolls] = useState([]);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value !== "") {
            if (value.startsWith("@")) {
                const filtered = polls.filter((poll) =>
                    poll.author_name.toLowerCase().includes(value.toLowerCase().slice(1))
                );
                setFilteredPolls(filtered);
            } else {
                const filtered = polls.filter((poll) =>
                    poll.question.toLowerCase().includes(value.toLowerCase())
                );
                setFilteredPolls(filtered);
            }
        } else {
            const filtered = polls.filter((poll) => " ")
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

        if (diffInMinutes < 20) {
            return "just now";
        } else if (diffInHours < 1) {
            return `${diffInMinutes} minutes ago`;
        } else if (diffInDays < 1) {
            return `${diffInHours} hours ago`;
        } else if (diffInDays < 2) {
            return `${diffInDays} day ago`;
        } else if (diffInDays < 30) {
            return `${diffInDays} days ago`;
        } else if (diffInMonths < 2) {
            return `${diffInMonths} month ago`;
        } else {
            return `${diffInMonths} months ago`;
        }
    };


    if (isLoading) {
        return (
            <ReactLoading className="position-fixed top-50 start-50 translate-middle h3" height={'6%'} width={'6%'}
                          type="bubbles" color="#505253"/>
        );
    }

    return (
        <div className="BasePageCss">
            <div className="body-wrapper">
                <div className="body-inner h-100 w-75 position-relative">
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <input
                            type="search"
                            className="form-control rounded weak-orange"
                            style={{flex: 1}}
                            placeholder="Введите название опроса..."
                            aria-label="Search"
                            value={searchTerm}
                            onInput={handleSearch}
                        />
                        <button className="btn btn-primary background_color_of_primary_btn" onClick={event => navigate(`/polls/new/`)} style={{marginLeft: '10px', maxHeight: '40px', fontSize: '14px'}}>
                            Создать опрос
                        </button>
                    </div>
                    <div
                        className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
                        <div className="list-group list-group-checkable h-100 w-100 rounded">
                            {filteredPolls.length === 0 ? (
                                <div className="text_color">
                                    <label>Похоже, что опросов по-вашему поиску нет... Перепроверьте поиск или </label>
                                    {' '}
                                    <a href={`/polls/new/`}>создайте новый опрос</a>.
                                </div>
                            ) : (
                                filteredPolls.map((poll) => (
                                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                    <a
                                        onClick={() => navigate(`/polls/${poll.id}`)}
                                        key={poll.id}
                                        className="list-group-item list-group-item-action weak_blue"
                                    >
                                        <div className="d-flex w-100 justify-content-between align-items-center">
                                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                                <h5 className="mb-1">{poll.question}</h5>
                                                <small style={{marginLeft: '5px'}}>
                                                    <MdAccessAlarm size={22} style={{color: '#910000'}}/>
                                                    <MdPerson size={22} style={{color: '#910000'}}/>
                                                </small>
                                            </div>
                                            <small>{formatTimeSinceCreation(poll.created_at)}</small>
                                        </div>
                                    </a>
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