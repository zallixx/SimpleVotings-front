import React, {useContext} from "react";
import RegisterForm from './RegisterForm';
import AuthContext from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    let {user} = useContext(AuthContext);
    const navigate = useNavigate();
    if (user) {
        navigate('/');
        return;
    }
    return (
        <div className="BasePageCss">
            <RegisterForm/>
        </div>
    );

}

export default RegisterPage;
