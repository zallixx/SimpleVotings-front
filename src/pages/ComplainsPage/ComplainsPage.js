import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ReactLoading from "react-loading";

const ComplainsPage = () => {
    let {authTokens} = useContext(AuthContext);
    const [complains, setComplains] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchComplains = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/complains/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                setComplains(data);
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchComplains().then(
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
                    <div
                        className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
                        <div className="list-group list-group-checkable h-100 w-100 rounded">
                            {complains.length === 0 ? (
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <label>У вас нет жалоб </label>
                                </div>
                            ) : (
                                <>
                                    {complains.map((complain) => (
                                        <div className="list-group-item list-group-item-action weak_blue rounded">
                                            {complain.status === "Рассмотрена" ? (
                                                // eslint-disable-next-line
                                                <a onClick={() => navigate(`/complains/${complain.id}`)}>
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{complain.text}</h5>
                                                        <small> {complain.status + ". Нажми, чтобы посмотреть ответ от администрации"}</small>
                                                    </div>
                                                </a>
                                            ) : (
                                                // eslint-disable-next-line
                                                <a>
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{complain.text}</h5>
                                                        <small> {complain.status}</small>
                                                    </div>
                                                </a>
                                            )}
                                        </div>
                                    ))
                                    }
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComplainsPage;