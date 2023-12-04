import React, {useContext} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext);
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <Link className="navbar-brand" to={'/'}>
                    Home
                </Link>
                {user ? (
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" onClick={logoutUser} to={'/login'}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>) : (
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/login'}>
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/register'}>
                                    Sign up
                                </Link>
                            </li>
                        </ul>
                    </div>)}
            </div>
        </nav>
    )
};

export default Header