import React, {useContext} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext);
    return (
        <div>
            <Link to="/">Home</Link>
            <span> | </span>
            {user ? (
                <a onClick={logoutUser}>Logout</a>
            ) : (
                <div>
                    <Link to="/login">Login</Link>
                    <span> | </span>
                    <Link to="/register">Register</Link>
                </div>
            )}
            {user && <p>Hello, {user.username}</p>}
        </div>
    )
};

export default Header