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
                            <FormLabel>Username</FormLabel>
                            <FormControl type="text" name="username" className="form-control" placeholder="Username"/>
                        </FormGroup>
                        <FormGroup controlId="formEmail" className="mb-3">
                            <FormLabel>Email</FormLabel>
                            <FormControl type="email" name="email" className="form-control"
                                         placeholder="Email Address"/>
                        </FormGroup>
                        <FormGroup controlId="formPassword1" className="mb-3">
                            <FormLabel>Password</FormLabel>
                            <FormControl type="password" name="password" className="form-control"
                                         placeholder="Password"/>
                        </FormGroup>
                        <FormGroup controlId="formPassword2" className="mb-3 ">
                            <FormLabel>Repeat Password</FormLabel>
                            <FormControl type="password" name="password2" className="form-control"
                                         placeholder="Repeat Password"/>
                        </FormGroup>
                        <FormGroup style={buttonStyle} controlId="formSubmit" className="d-grid">
                            <Button variant="primary" type="submit" className="">
                                Register
                            </Button>
                        </FormGroup>
                    </Form>
                    <p style={{textAlign: 'center'}}>Already have an account? <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    )
};

export default RegisterPage
