import React, {useContext, useState} from 'react';
import {Button, Form, FormControl, FormGroup, FormLabel, Modal} from 'react-bootstrap';
import AuthContext from "../../context/AuthContext";

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext);
    const [showFirstModal, setShowFirstModal] = useState(false);
    const [modal_title, setModalTitle] = useState("Password Recover");
    const [new_param, setNewParam] = useState("");
    const [disabled_button, setDisabledButton] = useState(false);

    const resetPassword = async (event) => {
        event.preventDefault();
        try {
            setDisabledButton(true);
            fetch('http://127.0.0.1:8000/api/reset_password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: new_param
                })
            }).then((response) => {
                if (response.status === 200) {
                    setModalTitle("Success");
                }
                else {
                    setDisabledButton(false);
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="BasePageCss">
            <div className="body-wrapper">
                <div className="body-inner">
                    <h3 style={{textAlign: 'center'}}>Login to your account</h3>
                    <Form className="LoginForm" id="loginForm" onSubmit={loginUser}>
                        <FormGroup controlId="formUsername" className="mb-3">
                            <FormLabel>Username</FormLabel>
                            <FormControl type="text" name="username" className="form-control" placeholder="Username" required/>
                        </FormGroup>
                        <FormGroup controlId="formPassword" className="mb-3">
                            <FormLabel>Password</FormLabel>
                            <small style={{float: 'right', cursor: 'pointer'}}>
                                <p onClick={() => setShowFirstModal(true)}>Forgot password?</p>
                            </small>
                            <FormControl type="password" name="password" className="form-control"
                                         placeholder="Password" required/>
                        </FormGroup>
                        <FormGroup style={{marginBottom: 0}} controlId="formSubmit" className="d-grid">
                            <Button variant="primary" type="submit" className="">
                                Login
                            </Button>
                        </FormGroup>
                    </Form>
                    <p className="mt-2" style={{textAlign: 'center'}}>Don't have an account? <a href="/register">Register here</a></p>
                </div>
            <Modal centered onHide={() => showFirstModal ? setShowFirstModal(false) : null} show={showFirstModal}>
                <Form onSubmit={resetPassword}>
                    <Modal.Header closeButton className="rounded-top-1 border-0">
                        <Modal.Title>{modal_title}</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            {modal_title === "Password Recover" ? (
                                <>
                                    <small>We need your email to sent you a reset password link</small>
                                    <FormControl type="email" name="email" className="form-control mt-3"
                                                 placeholder="Email Address" onInput={(e) => setNewParam(e.target.value)} required/>
                                </>
                            ) : (
                                <>
                                    <small>We have sent you an email with a link to reset your password</small>
                                </>
                            )}
                        </Modal.Body>
                    <Modal.Footer className="rounded-bottom-1 border-0">
                        <span className="d-inline-block" data-toggle="tooltip" title={modal_title === "Success" ? "Мы уже отправили вам письмо на почту, которую вы указали" : null}>
                            <Button variant="primary" type="submit" disabled={disabled_button}>
                                Отправить
                            </Button>
                        </span>
                        <Button variant="secondary" onClick={() => setShowFirstModal(false)}>
                            Отмена
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            </div>
        </div>
    )

}

export default LoginPage;

