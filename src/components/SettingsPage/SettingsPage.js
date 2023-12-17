import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/AuthContext";
import { BsFeather } from "react-icons/bs";
import ReactLoading from "react-loading";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const SettingsPage = () => {
    let {authTokens} = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [title_of_modal, setTitleOfModal] = useState('');
    const [new_param, setNewParam] = useState('');
    const [old_param, setOldParam] = useState('');
    const [type_modal, setTypeModal] = useState('');
    const [isSwitchClicked, setIsSwitchClicked] = useState(false);


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
            let paramPayload = {};
            if(type_modal === 'username') {
                paramPayload = {
                    username: new_param
                }
            } else if(type_modal === 'email') {
                paramPayload = {
                    email: new_param
                }
            } else if(type_modal === 'first_name') {
                paramPayload = {
                    first_name: new_param
                }
            } else if(type_modal === 'last_name') {
                paramPayload = {
                    last_name: new_param
                }
            }
            const response = await fetch('http://127.0.0.1:8000/api/settings/edit/', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body: JSON.stringify(paramPayload),
            });
            if (response.status === 200) {
                alert("Параметр изменен");
                setShow(false);
                window.location.reload();
            } else {
                alert("-1");
            }
        } catch (error) {
            console.error(error);
        }
    };


    const SetPublicStatus = async (checked) => {
        try {
            let paramPayload = {};
            if(checked === true) {
                paramPayload = {
                    is_public: 1
                }
            } else {
                paramPayload = {
                    is_public: 0
                }
            }
            const response = await fetch('http://127.0.0.1:8000/api/settings/edit/', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body: JSON.stringify(paramPayload),
            });
            if (response.status === 200) {
                alert("Параметр изменен");
                window.location.reload();
            } else {
                alert("-1");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const SetShowHistory = async (checked) => {
        try {
            let paramPayload = {};
            if(checked === true) {
                paramPayload = {
                    show_history: 1
                }
            } else {
                paramPayload = {
                    show_history: 0
                }
            }
            const response = await fetch('http://127.0.0.1:8000/api/settings/edit/', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body: JSON.stringify(paramPayload),
            });
            if (response.status === 200) {
                alert("Параметр изменен");
                window.location.reload();
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
                    <div>
                        <h4 style={{justifyContent: 'center', display: 'flex'}}>Настройки публичной информации</h4>
                        {userInfo.avatar ? (
                                <div>
                                    <img src={userInfo.avatar} style={{width: '100px', height: '100px'}}/>
                                </div>
                            )
                            : (
                                <div>
                                    <label>Похоже вы не загрузили аватар. Давайте загрузим его!</label>
                                    <br/>
                                    <input type="file" name="avatar" accept="image/png, image/jpeg"/>
                                </div>
                            )}
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <h5> Ваша цитата: {userInfo.quote !== null ? userInfo.quote : "Не установлено"}</h5>
                            <div style={{marginLeft: '10px', color: '#2980b9', cursor: 'pointer'}}>
                                <BsFeather onClick={() => alert("Цитаты и аватарки не работают")}/>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    <div>
                        <h4 style={{justifyContent: 'center', display: 'flex'}}>Настройки приватности</h4>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <h5> Публичный профиль - {userInfo.is_public ? 'Да' : 'Нет'} </h5>
                            <div style={{marginLeft: '10px', color: '#2980b9', cursor: 'pointer'}}>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" checked = {userInfo.is_public}
                                           id="flexSwitchCheckChecked" onChange={(e) => {setIsSwitchClicked(true); SetPublicStatus(e.target.checked); }} disabled={isSwitchClicked}/>
                                </div>
                            </div>
                        </div>
                            {userInfo.is_public ? (
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <h5> Показывать историю голосования третьим лицам - {userInfo.show_history ? 'Да' : 'Нет'} </h5>
                                    <div style={{marginLeft: '10px', color: '#2980b9', cursor: 'pointer'}}>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" checked = {userInfo.show_history}
                                                   id="flexSwitchCheckChecked" onChange={(e) => {setIsSwitchClicked(true); SetShowHistory(e.target.checked); }} disabled={isSwitchClicked}/>
                                        </div>
                                    </div>
                                </div>
                            )
                                : null}
                        <hr/>
                    </div>
                    <h4 style={{justifyContent: 'center', display: 'flex'}}>Настройки</h4>
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
                            <a onClick={handleChangePassword} style={{color: '#2980b9', cursor: 'pointer'}}> Сменить
                                пароль </a>
                        </h5>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose} centered
                       className={"custom-modal-" + localStorage.getItem("theme")}>
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

export default SettingsPage;