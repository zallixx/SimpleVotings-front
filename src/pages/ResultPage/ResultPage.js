import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ReactLoading from "react-loading";
import { BsCheckCircleFill } from "react-icons/bs";


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
                    <h1>Результаты</h1>
                    {results.choices.map((result) => (
                        <div
                            className="result"
                            key={result.id}>
                            <div className="result-item">
                                {result[2].includes(user.user_id) ? (
                                    <div>
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <div className="result-percent">
                                                {Math.round(result[1] / num_of_votes * 100)}%
                                            </div>
                                            <div className="result-name" style={{marginLeft: '5px'}}>
                                                {result[0]}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <div className="result-checkmark">
                                                    <BsCheckCircleFill/>
                                                </div>
                                                <div className="progress" style={{marginLeft: '10px', flex: '1'}}>
                                                    <div
                                                        className="progress-bar"
                                                        role="progressbar"
                                                        style={{width: Math.round(result[1] / num_of_votes * 100) + '%'}}
                                                        aria-valuenow={Math.round(result[1] / num_of_votes * 100)}
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <div className="result-percent">
                                                {Math.round(result[1] / num_of_votes * 100)}%
                                            </div>
                                            <div className="result-name" style={{marginLeft: '5px'}}>
                                                {result[0]}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <div className="progress" style={{marginLeft: '26px', flex: '1'}}>
                                                    <div
                                                        className="progress-bar"
                                                        role="progressbar"
                                                        style={{width: Math.round(result[1] / num_of_votes * 100) + '%'}}
                                                        aria-valuenow={Math.round(result[1] / num_of_votes * 100)}
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    ))}

                </div>
            </div>
        </div>
    );
};

export default ResultPage;