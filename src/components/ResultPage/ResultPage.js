import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ReactLoading from "react-loading";

const ResultPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    let {user, authTokens} = useContext(AuthContext);
    const params = useParams();
    const [num_of_votes, setNumOfVotes] = useState(0);

    useEffect(() => {
        fetchResults();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchResults = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/polls/' + params.id + '/results/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                setResults(data);
                let num = 0
                for (let i = 0; i < data.choices.length; i++) {
                    num += data.choices[i][1];
                }
                setNumOfVotes(num);
                setLoading(false);
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error(error);
        }
    };
    if (isLoading) {
        return (
            <ReactLoading className="position-fixed top-50 start-50 translate-middle h3" height={'6%'} width={'6%'}
                          type="bubbles" color="#505253"/>
        );
    }

    return (
        <div className="BasePageCss text_color">
            <div className="body-wrapper">
                <div className="results body-inner">
                    <h1>Results</h1>
                    {results.choices.map((result) => (
                        <div
                            className="result"
                            key={result.id}>
                            <div className="result-item">
                                <div className="result-name">
                                    {result[0]}
                                </div>
                                <div className="result-percent">
                                    {Math.round(result[1] / num_of_votes * 100)}%
                                </div>
                                {result[2].includes(user.user_id) ? (
                                    <div className="result-checkmark">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check"
                                             fill="currentColor"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06l-4.5 4.5z"/>
                                        </svg>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                <div
                                    className="progress">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{width: Math.round(result[1] / num_of_votes * 100) + '%'}}
                                        aria-valuenow={Math.round(result[1] / num_of_votes * 100)}
                                        aria-valuemin="0"
                                        aria-valuemax="100">
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}

                </div>
            </div>
        </div>
    );
};

export default ResultPage;