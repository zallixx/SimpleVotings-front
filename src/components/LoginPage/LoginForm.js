import React, {useContext} from 'react';
import {Button, Form, FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import AuthContext from "../../context/AuthContext";

const buttonStyle = {
    marginBottom: 0
};

const LoginForm = () => {
    let {loginUser} = useContext(AuthContext);
    return (
        <div className="body-wrapper">
            <div className="body-inner">
                <Form horizontal className="LoginForm" id="loginForm" onSubmit={loginUser}>
                    <FormGroup controlId="formUsername" className="mb-3 text_color">
                        <FormLabel>Username</FormLabel>
                        <FormControl type="text" name="username" className="form-control" placeholder="Username"/>
                    </FormGroup>
                    <FormGroup controlId="formPassword" className="mb-3 text_color">
                        <FormLabel>Password</FormLabel>
                        <FormControl type="password" name="password" className="form-control" placeholder="Password"/>
                    </FormGroup>
                    <FormGroup style={buttonStyle} controlId="formSubmit" className="d-grid">
                        <Button bsStyle="primary" type="submit" className="background_color_of_primary_btn">
                            Login
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        </div>
    )

}

export default LoginForm;
