import React, {useContext, useEffect, useRef, useState} from "react";

import {useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ReactLoading from "react-loading";
import {MdAccessAlarm, MdPerson} from "react-icons/md";
import './PollsPage.css';
import {Overlay, Popover} from "react-bootstrap";

const PollsPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [polls, setPolls] = useState([]);
    const navigate = useNavigate();
    let {authTokens} = useContext(AuthContext);
    const [showStatusPopOver, setShowStatusPopOver] = useState(false);
    const target = useRef(null);
    const [cheked_status, setChekedStatus] = useState("Все");
    const [currentPollsPage, setCurrentPollsPage] = useState(1);
    const pollsPerPage = 8;
    const indexOfLastPoll = currentPollsPage * pollsPerPage;
    const indexOfFirstPoll = indexOfLastPoll - pollsPerPage;

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
            return "Только что";
        } else if (diffInHours < 1) {
            return `${diffInMinutes} минут назад`;
        } else if (diffInDays < 1) {
            return `${diffInHours} часов назад`;
        } else if (diffInDays < 2) {
            return `${diffInDays} день назад`;
        } else if (diffInDays < 30) {
            return `${diffInDays} дней назад`;
        } else if (diffInMonths < 2) {
            return `${diffInMonths} месяц назад`;
        } else {
            return `${diffInMonths} месяцев назад`;
        }
    };

    const formatRemainingTime = (Time) => {
        const now = new Date();
        const RemainingTime = new Date(Time);

        const diffInMinutes = Math.floor((RemainingTime - now) / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if(diffInMinutes > 0) {
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
        } else {
            return 0;
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

    const currentPolls = filteredPolls.slice(indexOfFirstPoll, indexOfLastPoll);

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
                    <div>
                        <table className="table table-hover mt-2">
                            <thead className="table-header">
                            <tr>
                                <th scope="col" style={{textAlign: "left"}}>Название опроса</th>
                                <th scope="col">
                                    <button className="text_color" style={{backgroundColor: 'transparent', border: 'none', fontWeight: 'bold'}} onClick={() => setShowStatusPopOver(!showStatusPopOver)} ref={target}>Статус</button>
                                </th>
                                <th scope="col" style={{textAlign: "right"}}>Создан</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentPolls.map((poll, index) => (
                                <>
                                    {cheked_status === 'Все' ? (
                                        <tr key={index} onClick={() => navigate(`/polls/${poll.id}`)} className="weak_blue">
                                            <td>{poll.question}</td>
                                            <td>{(poll.special === 1 && (poll.amount_participants - poll.participants_amount_voted) < 1) || (poll.special === 2 && (formatRemainingTime(poll.remaining_time) === 0)) ? (
                                                'Закрыт'
                                            ) : (
                                                'Открыт' + (poll.special === 1 ? `(${formatVoteNumber(poll.amount_participants - poll.participants_amount_voted)})`
                                                    : poll.special === 2 ? `(${formatRemainingTime(poll.remaining_time)})` : '')
                                            )}</td>
                                            <td style={{textAlign: "right"}}>{formatTimeSinceCreation(poll.created_at)}</td>
                                        </tr>
                                    ) : cheked_status === "Открытые" ? (
                                        <>
                                            {!((poll.special === 1 && (poll.amount_participants - poll.participants_amount_voted) < 1) || (poll.special === 2 && (formatRemainingTime(poll.remaining_time) === 0))) ? (
                                                <tr key={index} onClick={() => navigate(`/polls/${poll.id}`)} className="weak_blue">
                                                    <td>{poll.question}</td>
                                                    <td>{'Открыт' + (poll.special === 1 ? `(${formatVoteNumber(poll.amount_participants - poll.participants_amount_voted)})`
                                                            : poll.special === 2 ? `(${formatRemainingTime(poll.remaining_time)})` : ''
                                                    )}</td>
                                                    <td style={{textAlign: "right"}}>{formatTimeSinceCreation(poll.created_at)}</td>
                                                </tr>
                                            ) : null}
                                        </>
                                    ) : cheked_status === "Закрытые" && (poll.special === 1 && (poll.amount_participants - poll.participants_amount_voted) < 1) || (poll.special === 2 && (formatRemainingTime(poll.remaining_time) === 0)) ? (
                                        <tr key={index} onClick={() => navigate(`/polls/${poll.id}`)} className="weak_blue">
                                            <td>{poll.question}</td>
                                            <td>Закрыт</td>
                                            <td style={{textAlign: "right"}}>{formatTimeSinceCreation(poll.created_at)}</td>
                                        </tr>
                                    ) : null}
                                </>
                            ))}
                            </tbody>
                        </table>
                        <ul className="pagination mt-3 justify-content-end">
                            <li className={`page-item ${currentPollsPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link" onClick={() => setCurrentPollsPage(currentPollsPage - 1)}>Previous</a>
                            </li>
                            {Array.from({length: Math.ceil(filteredPolls.length / pollsPerPage)}).map((_, index) => (
                                <li className={`page-item ${currentPollsPage === index + 1 ? 'active' : ''}`}
                                    key={index}>
                                    <a className="page-link" onClick={() => setCurrentPollsPage(index + 1)}>{index + 1}</a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPollsPage === Math.ceil(filteredPolls.length / pollsPerPage) ? 'disabled' : ''}`}>
                                <a className="page-link" onClick={() => setCurrentPollsPage(currentPollsPage + 1)}>Next</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Overlay target={target.current} show={showStatusPopOver} placement="bottom" rootClose rootCloseEvent="click" onHide={e => setShowStatusPopOver(false)}>
                <Popover id="popover-contained" className={`rounded-6`}>
                    <Popover.Body className={`rounded-6`}>
                        <div className="d-flex flex-column">
                            <label className="form-check-label fs-5 fw-normal radio">
                                <input className="form-check-input mx-2 border-1 border-dark" type={"checkbox"} checked={cheked_status === "Все"} onClick={() => {cheked_status === "Все" && setShowStatusPopOver(false) ? setChekedStatus(null) : setChekedStatus("Все")}} onChange={() => setShowStatusPopOver(false)}/>
                                {'Все'}
                            </label>
                            <label className="form-check-label fs-5 fw-normal radio">
                                <input className="form-check-input mx-2 border-1 border-dark" type={"checkbox"} checked={cheked_status === "Открытые"} onClick={() => {cheked_status === "Открытые" && setShowStatusPopOver(false) ? setChekedStatus(null) : setChekedStatus("Открытые")}} onChange={() => setShowStatusPopOver(false)}/>
                                {'Открытые'}
                            </label>
                            <label className="form-check-label fs-5 fw-normal radio">
                                <input className="form-check-input mx-2 border-1 border-dark" type={"checkbox"} checked={cheked_status === "Закрытые"} onClick={() => {cheked_status === "Закрытые" && setShowStatusPopOver(false) ? setChekedStatus(null) : setChekedStatus("Закрытые")}} onChange={() => setShowStatusPopOver(false)}/>
                                {'Закрытые'}
                            </label>
                        </div>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    );
}

export default PollsPage;