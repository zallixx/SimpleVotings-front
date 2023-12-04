import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";

const RegisterPage = () => {
    let {registerUser} = useContext(AuthContext);
    return (
        <div>
            <form onSubmit={registerUser}>
                <input type="text" name="username" placeholder="Enter username"/>
                <input type="email" name="email" placeholder="Enter email"/>
                <input type="password" name="password" placeholder="Enter password"/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
};

export default RegisterPage