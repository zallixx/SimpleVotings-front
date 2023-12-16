import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/AuthContext";
import ReactLoading from "react-loading";
import {useParams} from "react-router-dom";

const AnswerForComplainPage = () => {
    let {authTokens} = useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);
    const [complain, setComplain] = useState();
    const params = useParams();

    const fetchComplain = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/complains/' + params.id + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                setComplain(data);
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchComplain().then(
            () => setLoading(false)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return (
            <ReactLoading className="position-fixed top-50 start-50 translate-middle h3" height={'6%'} width={'6%'}
                          type="bubbles" color="#505253"/>
        )
    }

    return (
        <div className="BasePageCss">
            <div className="body-wrapper">
                <div className="body-inner h-100 w-75 position-relative">
                    <h3 className="mb-1">{complain[0].text}</h3>
                    <hr/>
                    <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
                        <h6>Ответ:</h6>
                        <p className="mb-2">{complain[0].response}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnswerForComplainPage;