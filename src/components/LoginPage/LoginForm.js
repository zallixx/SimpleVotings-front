import React, {useContext} from 'react';
import {Button, Form, FormControl, FormGroup} from 'react-bootstrap';
import AuthContext from "../../context/AuthContext";

const buttonStyle = {
    marginBottom: 0
};

const LoginForm = () => {
    let {loginUser} = useContext(AuthContext);
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <Form horizontal className="LoginForm" id="loginForm" onSubmit={loginUser}>
                    <FormGroup controlId="formUsername" className="mb-3">
                        <FormControl type="text" name="username" className="form-control" placeholder="Email Address"/>
                    </FormGroup>
                    <FormGroup controlId="formPassword" className="mb-3">
                        <FormControl type="password" name="password" className="form-control" placeholder="Password"/>
                    </FormGroup>
                    <FormGroup style={buttonStyle} controlId="formSubmit" className="d-grid">
                        <Button bsStyle="primary" type="submit">
                            Login
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        </div>
    )

}

export default LoginForm;
