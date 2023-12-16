import React, {useContext} from "react";
import LoginForm from './LoginForm';
import AuthContext from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    let {user} = useContext(AuthContext);
    const navigate = useNavigate();
    if (user) {
        navigate('/');
        return;
    }
    return (
      <div className="BasePageCss">

        <LoginForm/>
      </div>
    );

}

export default LoginPage;
