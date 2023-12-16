import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/AuthContext";
import { BsFeather } from "react-icons/bs";
import ReactLoading from "react-loading";

import { BsFillXSquareFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ProfilePage = () => {
    let {authTokens} = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [title_of_modal, setTitleOfModal] = useState('');

    const handleClose = () => setShow(false);

    const fetchUser = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/profile/', {
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
        setTitleOfModal('Изменение логина');
    }

    const handleChangeEmail = () => {
        setShow(true);
        setTitleOfModal('Изменение почты');
    }

    function handleChangeFirstName() {
        setShow(true);
        setTitleOfModal('Изменение имени');
    }

    function handleChangeLastName() {
        setShow(true);
        setTitleOfModal('Изменение фамилии');
    }

    function handleChangePassword() {
        setShow(true);
        setTitleOfModal('Изменение пароля');
    }

    return (
        <div className="BasePageCss">
            <div className="body-wrapper">
                <div className="body-inner h-100 w-75">
                    <h3>Настройки</h3>
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
                        <h5>
                            <a onClick={handleChangePassword} style={{color: '#2980b9', cursor: 'pointer'}}> Сменить пароль </a>
                        </h5>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose} centered bsPrefix="" className="rounded-1">
                    <Modal.Header bsPrefix={"custom-modal-" + localStorage.getItem("theme")}>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Modal.Title>{title_of_modal}</Modal.Title>
                            <div style={{color: '#2980b9', cursor: 'pointer', marginTop: '-4px'}}>
                                <BsFillXSquareFill onClick={handleClose}/>
                            </div>
                        </div>
                        <hr/>
                    </Modal.Header>
                    <Modal.Body bsPrefix={"custom-modal-" + localStorage.getItem("theme")}>
                    </Modal.Body>
                    <Modal.Footer bsPrefix={"custom-modal-" + localStorage.getItem("theme")}>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default ProfilePage;