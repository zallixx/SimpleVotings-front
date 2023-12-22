import {useContext, useEffect, useState, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {ButtonGroup, Overlay, Popover, Tooltip} from "react-bootstrap";
import AuthContext from "../context/AuthContext";

import {ThemeContext} from "../App";

import './Header.css';

const authorized_tabs = {
    'Home': '/',
    'Polls' : '/polls/',
    'Complains' : '/complains/',
};

const unauthorized_tabs = {
    'Login' : '/login/',
    'Register' : '/register/',
}

const menu_items = {
    'Vote history': '/vote-history/',
    'Settings': '/settings/',
    'Logout' : '/login/',
};

const Header = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [user_prop, setUserProp] = useState({name: 'Login to see your username!'});
    const [activeTab, setActiveTab] = useState(null);
    let {user, logoutUser} = useContext(AuthContext);
    // eslint-disable-next-line
    const {theme, toggleTheme} = useContext(ThemeContext);
    const target = useRef(null);

    useEffect(() => {
        if (user !== null) {
            setUserProp({
                name: user.username,
            });
        }
        }, [user]
    );

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleAuthorizedTabClick = (tab) => {
        navigate(authorized_tabs[tab]);
        setActiveTab(tab);
    };

    const handleUnAuthorizedTabClick = (tab) => {
        navigate(unauthorized_tabs[tab]);
        setActiveTab(tab);
    };

    const handleMenuItemClick = (item) => {
        const path = menu_items[item];
        if (path) {
            navigate(path);
            if(item === 'Logout') {
                logoutUser();
            }
        }
        setActiveTab(item);
    };

    const items_tabs = Object.keys(authorized_tabs).map((tab) => (
        <button className={`btn border-0 rounded-0 tab text_color ${activeTab === tab ? 'active' : ''}`} value={tab} key={tab}
                onClick={() => handleAuthorizedTabClick(tab)}>
            {tab}
        </button>
    ))

    const unauthorized_items = Object.keys(unauthorized_tabs).map((tab) => (
        <button className={`btn border-0 rounded-0 tab text_color ${activeTab === tab ? 'active' : ''}`} value={tab} key={tab}
                onClick={() => handleUnAuthorizedTabClick(tab)}>
            {tab}
        </button>
    ))

    const items_menu = (
        <div>
            {Object.keys(menu_items).map((item) => (
                <div key={item}>
                    {item !== 'Logout' && (
                        <button
                            className={`btn border-0 rounded-0 tab ${activeTab === item ? 'active' : ''} ${theme === 'light' ? 'light-background' : 'dark-background'}`}
                            onClick={() => handleMenuItemClick(item)}
                        >
                            {item}
                        </button>
                    )}
                </div>
            ))}
            <hr/>
            {Object.keys(menu_items).map((item) => (
                <div key={item}>
                    {item === 'Logout' && (
                        <button
                            className="btn text-darkred mb-xxl-3"
                            onClick={() => handleMenuItemClick(item)}
                        >
                            {item}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className="navbar fixed-top navbar_params">
            <button className="btn border-0 change_theme_btn" onClick={toggleTheme}>
                Change Theme
            </button>
            {user !== null ?
                <button className="dropdown-toggle btn border-0 username_btn" onClick={handleButtonClick} ref={target}>
                    {user_prop.name}
                </button>
                    : null
            }
            {isOpen && (
            <Overlay target={target.current} show={isOpen} placement="bottom" rootClose rootCloseEvent="click" onHide={e => setIsOpen(false)}>
                <Popover id="popover-contained" className={`rounded-6 ${theme === 'light' ? 'light-background' : 'dark-background'}`}>
                    {user !== null ? items_menu : null}
                </Popover>
            </Overlay>
            )}
            <div className="navbar_items">
                <ButtonGroup>
                    {user !== null ? items_tabs : unauthorized_items}
                </ButtonGroup>
            </div>
        </div>
    );
};

export default Header
