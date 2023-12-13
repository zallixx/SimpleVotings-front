import React, {useContext, useEffect, useState} from "react";
import "./ResultPage.css"
import {useParams} from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const ResultPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    let {authTokens} = useContext(AuthContext);
    const params = useParams();

    useEffect(() => {
        fetchResults().then(() => setLoading(false));
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
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error(error);
        }
    };
    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="ResultPage">

            <div className="auth-wrapper">
                <div className="results auth-inner">
                    <h1>Results</h1>
                    {results.choices.map((result) => (
                            <div
                                className="result"
                                key={result.id}>
                                <h2>{result[0]}</h2>
                                <p>{result[1]} votes</p>
                            </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResultPage;