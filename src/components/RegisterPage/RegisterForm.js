import React, {useContext} from 'react';
import {Button, Form, FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import AuthContext from "../../context/AuthContext";

const buttonStyle = {
    marginBottom: 0
};

const RegisterPage = () => {
    let {registerUser} = useContext(AuthContext);
    return (
        <div className="body-wrapper">
            <div className="body-inner">
                <Form horizontal className="LoginForm" id="loginForm" onSubmit={registerUser}>
                    <FormGroup controlId="formUsername" className="mb-3 text_color">
                        <FormLabel>Username</FormLabel>
                        <FormControl type="text" name="username" className="form-control" placeholder="Username"/>
                    </FormGroup>
                    <FormGroup controlId="formEmail" className="mb-3 text_color">
                        <FormLabel>Email</FormLabel>
                        <FormControl type="email" name="email" className="form-control" placeholder="Email Address"/>
                    </FormGroup>
                    <FormGroup controlId="formPassword" className="mb-3 text_color">
                        <FormLabel>Password</FormLabel>
                        <FormControl type="password" name="password" className="form-control" placeholder="Password"/>
                    </FormGroup>
                    <FormGroup controlId="formPassword" className="mb-3 text_color">
                        <FormLabel>Repeat Password</FormLabel>
                        <FormControl type="password" name="password2" className="form-control" placeholder="Repeat Password"/>
                    </FormGroup>
                    <FormGroup style={buttonStyle} controlId="formSubmit" className="d-grid">
                        <Button bsStyle="primary" type="submit text_color">
                            Register
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        </div>
    )

}

export default RegisterPage;
