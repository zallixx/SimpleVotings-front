import React, {useContext} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import './Header.css';

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext);
    return (
        <div className="navbar fixed-top flex-md-nowrap p-0 Header">
            <ul className="nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link Link_color">
                        Home
                    </Link>
                </li>
                {user ? (
                    <li className="nav-item">
                        <Link to="/profile" className="nav-link Link_color">
                            Profile
                        </Link>
                    </li>
                ) : null}
                {user ? (
                    <li className="nav-item">
                        <Link to="/polls" className="nav-link Link_color">
                            Polls
                        </Link>
                    </li>
                ) : null}
                {user ? null :
                    <li className="nav-item">
                        <Link to="/login" className="nav-link Link_color">
                            Login
                        </Link>
                    </li>
                }
                {user ? null :
                    <li className="nav-item">
                        <Link to="/register" className="nav-link Link_color">
                            Register
                        </Link>
                    </li>
                }
                <li className="nav-item">
                    <Link className="nav-link Link_color" onClick={logoutUser} to={'/login'} style={{ position: 'absolute', right: 0 }}>
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    )
};

export default Header