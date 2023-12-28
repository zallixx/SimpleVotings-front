import {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ButtonGroup, Col, Overlay, Popover, Row} from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import {BsBrightnessHigh} from "react-icons/bs";
import {MdHistory, MdLogout, MdOutlineBrightness2, MdPerson, MdSettings} from "react-icons/md";
import {ThemeContext} from "../../App";

import './Header.css';

const authorized_tabs = {
    'Home': '/',
    'Polls': '/polls/',
    'Complains': '/complains/',
};

const unauthorized_tabs = {
    'Login': '/login/',
    'Register': '/register/',
}

const menu_items = {
    'Vote history': '/vote-history/',
    'Settings': '/settings/',
    'Profile': '/user/',
    'Logout': '/login/',
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
            if (item === 'Logout') {
                logoutUser();
            }
        }
        setActiveTab(item);
    };

    const items_tabs = Object.keys(authorized_tabs).map((tab) => (
        <button className={`btn border-0 rounded-0 tab text_color ${activeTab === tab ? 'active' : ''}`} value={tab}
                key={tab}
                onClick={() => handleAuthorizedTabClick(tab)}>
            {tab}
        </button>
    ))

    const unauthorized_items = Object.keys(unauthorized_tabs).map((tab) => (
        <button className={`btn border-0 rounded-0 tab text_color ${activeTab === tab ? 'active' : ''}`} value={tab}
                key={tab}
                onClick={() => handleUnAuthorizedTabClick(tab)}>
            {tab}
        </button>
    ))

    const items_menu = (
        <div>
            {Object.keys(menu_items).map((item) => (
                <div key={item}>
                    <Row xs={1} md={1} style={{display: 'flex'}}>
                        <Col>
                            <Row xs={1} md={2} className="align-items-center">
                                <Col>
                                    {item === 'Vote history' && (
                                        <MdHistory size={27} style={{textAlign: 'left', cursor: 'pointer'}}
                                                   onClick={() => handleMenuItemClick(item)}/>
                                    )}
                                </Col>
                                <Col>
                                    {item === 'Vote history' && (
                                        <button
                                            className={`btn border-0 rounded-0 tab ${activeTab === item ? 'active' : ''} ${theme === 'light' ? 'light-background' : 'dark-background'}`}
                                            onClick={() => handleMenuItemClick(item)}
                                            style={{marginLeft: '-59px'}}
                                        >
                                            {item}
                                        </button>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row xs={1} md={2} className="align-items-center">
                                <Col>
                                    {item === 'Settings' && (
                                        <MdSettings size={27} style={{textAlign: 'left', cursor: 'pointer'}}
                                                    onClick={() => handleMenuItemClick(item)}/>
                                    )}
                                </Col>
                                <Col>
                                    {item === 'Settings' && (
                                        <button
                                            className={`btn border-0 rounded-0 tab ${activeTab === item ? 'active' : ''} ${theme === 'light' ? 'light-background' : 'dark-background'}`}
                                            onClick={() => handleMenuItemClick(item)}
                                            style={{marginLeft: '-59px'}}
                                        >
                                            {item}
                                        </button>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row xs={1} md={2} className="align-items-center">
                                <Col>
                                    {item === 'Profile' && (
                                        <MdPerson size={27} style={{textAlign: 'left', cursor: 'pointer'}}
                                                  onClick={() => handleMenuItemClick(item)}/>
                                    )}
                                </Col>
                                <Col>
                                    {item === 'Profile' && (
                                        <button
                                            className={`btn border-0 rounded-0 tab ${activeTab === item ? 'active' : ''} ${theme === 'light' ? 'light-background' : 'dark-background'}`}
                                            onClick={() => {navigate('/users/' + user.user_id); setActiveTab(item)}}
                                            style={{marginLeft: '-59px'}}
                                        >
                                            {item}
                                        </button>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row xs={1} md={2} className="align-items-center">
                                <Col>
                                    {item === 'Logout' && (
                                        <MdLogout size={27}
                                                  style={{textAlign: 'left', color: 'darkred', cursor: 'pointer'}}
                                                  onClick={() => handleMenuItemClick(item)}/>
                                    )}
                                </Col>
                                <Col>
                                    {item === 'Logout' && (
                                        <button
                                            className={`btn border-0 rounded-0 text-darkred ${theme === 'light' ? 'light-background' : 'dark-background'}`}
                                            onClick={() => handleMenuItemClick(item)}
                                            style={{marginLeft: '-59px'}}
                                        >
                                            {item}
                                        </button>
                                    )}
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </div>
            ))}
        </div>
    );

    return (
        <div className="navbar fixed-top navbar_params">
            {theme !== 'light' ?
                <button className="btn border-0 change_theme_btn" onClick={toggleTheme} style={{marginBottom: '5px'}}>
                    <BsBrightnessHigh/>
                </button>
                :
                <button className="btn border-0 change_theme_btn" onClick={toggleTheme} style={{marginBottom: '5px'}}>
                    <MdOutlineBrightness2/>
                </button>
            }
            {user !== null ?
                <button className="dropdown-toggle btn border-0 username_btn" onClick={handleButtonClick} ref={target}>
                    {user_prop.name}
                </button>
                : null
            }
            {isOpen && (
                <Overlay target={target.current} show={isOpen} placement="bottom" rootClose rootCloseEvent="click"
                         onHide={e => setIsOpen(false)}>
                    <Popover id="popover-contained"
                             className={`rounded-6 ${theme === 'light' ? 'light-background' : 'dark-background'}`}
                             style={{overflow: 'hidden', width: '145px'}}>
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
