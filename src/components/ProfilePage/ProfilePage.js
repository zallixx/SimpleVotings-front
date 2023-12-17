import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/AuthContext";
import { BsFeather } from "react-icons/bs";
import ReactLoading from "react-loading";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ProfilePage = () => {
    let {authTokens} = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [title_of_modal, setTitleOfModal] = useState('');
    const [new_param, setNewParam] = useState('');
    const [old_param, setOldParam] = useState('');
    const [type_modal, setTypeModal] = useState('');
    const [payload, setPayload] = useState({});


    const handleClose = () => setShow(false);

    const fetchUser = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/settings/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access),
                    },
                });
                const data = await response.json();
                if (response.status === 200) {
                    setUserInfo(data)
                } else {
                    alert('Something went wrong!');
                }
            } catch (error) {
                console.error(error);
            }
        };

    useEffect(() => {
        fetchUser().then(
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

    function handleChangeUsername() {
        setShow(true);
        setTypeModal('username');
        setTitleOfModal('Изменение логина');
    }

    const handleChangeEmail = () => {
        setShow(true);
        setTypeModal('email');
        setTitleOfModal('Изменение почты');
    }

    function handleChangeFirstName() {
        setShow(true);
        setTypeModal('first_name');
        setTitleOfModal('Изменение имени');
    }

    function handleChangeLastName() {
        setShow(true);
        setTypeModal('last_name');
        setTitleOfModal('Изменение фамилии');
    }

    function handleChangePassword() {
        setShow(true);
        setTitleOfModal('Изменение пароля');
    }

    const handleUpdatePassword = async () => {
        try {
            const payload = {
                old_password: old_param,
                new_password: new_param,
            }
            const response = await fetch('http://127.0.0.1:8000/api/change_password/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body: JSON.stringify(payload),
            });
            if (response.status === 200) {
                alert("0");
            } else {
                alert("-1");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeParam = async () => {
        try {
            if(type_modal === 'username') {
                setPayload({
                    username: new_param
                })
            } else if(type_modal === 'email') {
                setPayload({
                    email: new_param
                })
            } else if(type_modal === 'first_name') {
                setPayload({
                    first_name: new_param
                })
            } else if(type_modal === 'last_name') {
                setPayload({
                    last_name: new_param
                })
            }
            const response = await fetch('http://127.0.0.1:8000/api/settings/edit/', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body: JSON.stringify(payload),
            });
            if (response.status === 200) {
                alert("0");
            } else {
                alert("-1");
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="BasePageCss">
            <div className="body-wrapper">
                <div className="body-inner h-100 w-75">
                    <h4 style={{ justifyContent: 'center', display: 'flex' }}>Настройки</h4>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <h5> Ваш логин: {userInfo.username} </h5>
                        <div style={{marginLeft: '10px', color: '#2980b9', cursor: 'pointer'}}>
                            <BsFeather onClick={handleChangeUsername}/>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <h5> Ваша почта: {userInfo.email} </h5>
                        <div style={{marginLeft: '10px', color: '#2980b9', cursor: 'pointer'}}>
                            <BsFeather onClick={handleChangeEmail}/>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <h5> Ваше имя: {userInfo.first_name !== null ? userInfo.first_name : "Не установлено"} </h5>
                        <div style={{marginLeft: '10px', color: '#2980b9', cursor: 'pointer'}}>
                            <BsFeather onClick={handleChangeFirstName}/>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <h5> Ваша фамилия: {userInfo.last_name !== null ? userInfo.last_name : "Не установлено"} </h5>
                        <div style={{marginLeft: '10px', color: '#2980b9', cursor: 'pointer'}}>
                            <BsFeather onClick={handleChangeLastName}/>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <h5> {/* eslint-disable-next-line */}
                            <a onClick={handleChangePassword} style={{color: '#2980b9', cursor: 'pointer'}}> Сменить пароль </a>
                        </h5>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose} centered className={"custom-modal-" + localStorage.getItem("theme")}>
                    <Modal.Header className="rounded-top-1 border-0">
                        <Modal.Title>{title_of_modal}</Modal.Title>
                    </Modal.Header>
                    {title_of_modal === 'Изменение пароля' ? (
                        <div>
                            <Modal.Body>
                                <input type="text" className="form-control" placeholder="Старое значение"
                                       onInput={(e) => setOldParam(e.target.value)}/>
                                <input type="text" className="form-control my-4" placeholder="Новое значение"
                                       onInput={(e) => setNewParam(e.target.value)}/>
                            </Modal.Body>
                            <Modal.Footer closeButton className="rounded-bottom-1 border-0">
                                <Button variant="primary" onClick={handleUpdatePassword}>
                                    Изменить
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Отмена
                                </Button>
                            </Modal.Footer>
                        </div>
                    ) : (
                        <div>
                            <Modal.Body>
                                <input type="text" className="form-control" placeholder="Новое значение" onInput={(e) => setNewParam(e.target.value)}/>
                            </Modal.Body>
                            <Modal.Footer closeButton className="rounded-bottom-1 border-0">
                                <Button variant="primary" onClick={handleChangeParam}>
                                    Изменить
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Отмена
                                </Button>
                            </Modal.Footer>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
}

export default ProfilePage;