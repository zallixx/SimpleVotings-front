import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {Button, Form, FormGroup} from "react-bootstrap";
import ReactLoading from 'react-loading';


const ComplainsPage = () => {
    let {authTokens} = useContext(AuthContext);
    const [complains, setComplains] = useState([]);

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
        fetchComplains();
    })

    return (
        <div className="BasePageCss">
            <div className="body-wrapper">
                <div className="body-inner h-100 w-75 position-relative">
                    {complains.map((complain) => (
                      <a className="list-group-item list-group-item-action weak_blue rounded">
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{complain.text}</h5>
                          <small> {complain.status}</small>
                        </div>
                      </a>
                    ))
                    }
                </div>
            </div>
        </div>
    );
}

export default ComplainsPage;