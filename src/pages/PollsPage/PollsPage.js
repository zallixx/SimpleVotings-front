import React, {useContext, useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ReactLoading from "react-loading";
import {MdAccessAlarm, MdPerson} from "react-icons/md";
import './PollsPage.css';

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

    const formatRemainingTime = (Time) => {
        const now = new Date();
        const RemainingTime = new Date(Time);

        const diffInMinutes = Math.floor((RemainingTime - now) / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 60) {
            return `Осталось ${diffInMinutes} минут`;
        } else if (diffInHours < 24) {
            if (diffInHours > 11 && diffInHours < 20) {
                return `Осталось ${diffInHours} часов`;
            } else if (diffInHours % 10 === 1) {
                return `Остался ${diffInHours} час`;
            } else if (diffInHours % 10 === 2 || diffInHours % 10 === 3 || diffInHours % 10 === 4) {
                return `Осталось ${diffInHours} часа`;
            } else {
                return `Осталось ${diffInHours} часов`;
            }
        } else if (diffInDays < 30) {
            if (diffInDays > 11 && diffInDays < 20) {
                return `Осталось ${diffInDays} дней`;
            } else if (diffInDays % 10 === 1) {
                return `Остался ${diffInDays} день`;
            } else if (diffInDays % 10 === 2 || diffInDays % 10 === 3 || diffInDays % 10 === 4) {
                return `Осталось ${diffInDays} дня`;
            } else {
                return `Осталось ${diffInDays} дней`;
            }
        }
    };
    const formatVoteNumber = (voteNumber) => {
        if (voteNumber > 11 && voteNumber < 20) {
            return `Осталось ${voteNumber} голосов`;
        } else if (voteNumber % 10 === 1) {
            return `Остался ${voteNumber} голос`;
        } else if (voteNumber % 10 === 2 || voteNumber % 10 === 3 || voteNumber % 10 === 4) {
            return `Осталось ${voteNumber} голоса`;
        } else {
            return `Осталось ${voteNumber} голосов`;
        }
    }

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
                        <button className="btn btn-primary"
                                onClick={event => navigate(`/polls/new/`)}
                                style={{marginLeft: '10px', maxHeight: '40px', fontSize: '14px'}}>
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
                                        <div className="d-flex w-100 justify-content-between align-items-center ">
                                            <div className="row" style={{display: 'flex', flexDirection: 'row'}}>
                                                <h5 className="mb-1 row">{poll.question}</h5>
                                                <small className="row">
                                                    {poll.special == 2 ?
                                                        (
                                                            <div>
                                                                <MdAccessAlarm size={22}
                                                                               style={{color: '#910000', marginLeft: '-11px'}}/>
                                                                <small
                                                                       style={{color: '#910000', marginLeft: '5px'}}>
                                                                    {formatRemainingTime(poll.remaining_time)}
                                                                </small>
                                                            </div>
                                                        )
                                                        : poll.special == 1 ?
                                                            (
                                                                <div>
                                                                    <MdPerson className="col" size={22}
                                                                              style={{color: '#910000', marginLeft: '-12px'}}/>
                                                                    <small
                                                                        className="col"
                                                                        style={{color: '#910000', marginLeft: '5px'}}>
                                                                        {formatVoteNumber(poll.amount_participants - poll.participants_amount_voted)}
                                                                    </small>
                                                                </div>
                                                            ) : null}
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