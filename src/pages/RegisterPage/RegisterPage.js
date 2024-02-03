import React, {useContext} from 'react';
import {Button, Form, FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import AuthContext from "../../context/AuthContext";


const buttonStyle = {
    marginBottom: 0
};


const RegisterPage = () => {
    let {registerUser} = useContext(AuthContext);
    return (
        <div className="BasePageCss">
            <div className="body-wrapper">
                <div className="body-inner">
                    <h3 style={{textAlign: 'center'}}>Register a new account</h3>
                    <Form className="LoginForm" id="loginForm" onSubmit={registerUser}>
                        <FormGroup controlId="formUsername" className="mb-3">
                            <FormLabel>Имя пользователя</FormLabel>
                            <FormControl type="text" name="username" className="form-control" placeholder="Имя пользователя" required/>
                        </FormGroup>
                        <FormGroup controlId="formEmail" className="mb-3">
                            <FormLabel>Почта</FormLabel>
                            <FormControl type="email" name="email" className="form-control"
                                         placeholder="Почта" required/>
                        </FormGroup>
                        <FormGroup controlId="formPassword1" className="mb-3">
                            <FormLabel>Пароль</FormLabel>
                            <FormControl type="password" name="password" className="form-control"
                                         placeholder="Пароль" required/>
                        </FormGroup>
                        <FormGroup controlId="formPassword2" className="mb-3 ">
                            <FormLabel>Повторите пароль</FormLabel>
                            <FormControl type="password" name="password2" className="form-control"
                                         placeholder="Повторите пароль" required/>
                        </FormGroup>
                        <FormGroup style={buttonStyle} controlId="formSubmit" className="d-grid">
                            <Button variant="primary" type="submit">
                                Зарегистрироваться
                            </Button>
                        </FormGroup>
                    </Form>
                    <p style={{textAlign: 'center'}}>Уже есть аккаунт? <a href="/login">Войти</a></p>
                </div>
            </div>
        </div>
    )
};

export default RegisterPage
