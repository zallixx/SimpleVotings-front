import {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ButtonGroup, Col, Overlay, Popover, Row} from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import {BsBrightnessHigh} from "react-icons/bs";
import {MdHistory, MdLogout, MdOutlineBrightness2, MdPerson, MdSettings} from "react-icons/md";
import {ThemeContext} from "../../App";

import './Header.css';

const authorized_tabs = {
    'Дом': '/',
    'Опросы': '/polls/',
    'Жалобы': '/complains/',
};

const unauthorized_tabs = {
    'Дом': '/',
    'Опросы': '/polls/',
}

const menu_items = {
    'История голосования': '/vote-history/',
    'Настройки': '/settings/',
    'Профиль': '/user/',
    'Выйти': '/login/',
};

const Header = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [user_prop, setUserProp] = useState({name: 'Login to see your username!'});
    let {user, logoutUser} = useContext(AuthContext);
    const {theme, toggleTheme} = useContext(ThemeContext);
    const pathname = window.location.pathname.slice(1);
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
    };

    const handleUnAuthorizedTabClick = (tab) => {
        navigate(unauthorized_tabs[tab]);
    };

    const handleMenuItemClick = (item) => {
        const path = menu_items[item];
        if (path) {
            navigate(path);
            if (item === 'Выйти') {
                logoutUser();
                setIsOpen(false);
            }
        }
    };

    const items_tabs = Object.keys(authorized_tabs).map((tab) => (
        // eslint-disable-next-line
        <a className={`border-0 rounded-0 item_on_header text_color ${(authorized_tabs[tab].includes(pathname) && pathname !== "") || (pathname === "" && tab === "Дом") ? "active" : ""}`} value={tab}
                key={tab}
                onClick={() => handleAuthorizedTabClick(tab)}>
            {tab}
        </a>
    ))

    const unauthorized_items = Object.keys(unauthorized_tabs).map((tab) => (
        // eslint-disable-next-line
        <a className={`border-0 rounded-0 item_on_header text_color ${(unauthorized_tabs[tab].includes(pathname) && pathname !== "") || (pathname === "" && tab === "Дом") ? "active" : ""}`} value={tab}
                key={tab}
                onClick={() => handleUnAuthorizedTabClick(tab)}>
            {tab}
        </a>
    ))

    const items_menu = (
        <div>
            {Object.keys(menu_items).map((item) => (
                <div key={item}>
                    <Row xs={1} md={1} style={{display: 'flex'}}>
                        <Col>
                            <Row xs={1} md={2} className="align-items-center">
                                <Col>
                                    {item === 'История голосования' && (
                                        <MdHistory size={27} style={{textAlign: 'left', cursor: 'pointer'}}
                                                   onClick={() => handleMenuItemClick(item)}/>
                                    )}
                                </Col>
                                <Col>
                                    {item === 'История голосования' && (
                                        // eslint-disable-next-line
                                        <a
                                            className={`item_on_menu ${theme === 'light' ? 'light-background' : 'dark-background'}`}
                                            onClick={() => handleMenuItemClick(item)}
                                            style={{marginLeft: '-48px'}}
                                        >
                                            {item}
                                        </a>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row xs={1} md={2} className="align-items-center">
                                <Col>
                                    {item === 'Настройки' && (
                                        <MdSettings size={27} style={{textAlign: 'left', cursor: 'pointer'}}
                                                    onClick={() => handleMenuItemClick(item)}/>
                                    )}
                                </Col>
                                <Col>
                                    {item === 'Настройки' && (
                                        // eslint-disable-next-line
                                        <a
                                            className={`item_on_menu ${theme === 'light' ? 'light-background' : 'dark-background'}`}
                                            onClick={() => handleMenuItemClick(item)}
                                            style={{marginLeft: '-48px'}}
                                        >
                                            {item}
                                        </a>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row xs={1} md={2} className="align-items-center">
                                <Col>
                                    {item === 'Профиль' && (
                                        <MdPerson size={27} style={{textAlign: 'left', cursor: 'pointer'}}
                                                  onClick={() => handleMenuItemClick(item)}/>
                                    )}
                                </Col>
                                <Col>
                                    {item === 'Профиль' && (
                                        // eslint-disable-next-line
                                        <a
                                            className={`item_on_menu ${theme === 'light' ? 'light-background' : 'dark-background'}`}
                                            onClick={() => {navigate('/users/' + user.user_id);}}
                                            style={{marginLeft: '-48px'}}
                                        >
                                            {item}
                                        </a>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row xs={1} md={2} className="align-items-center">
                                <Col>
                                    {item === 'Выйти' && (
                                        <MdLogout size={27}
                                                  style={{textAlign: 'left', color: 'darkred', cursor: 'pointer'}}
                                                  onClick={() => handleMenuItemClick(item)}/>
                                    )}
                                </Col>
                                <Col>
                                    {item === 'Выйти' && (
                                        // eslint-disable-next-line
                                        <a
                                            className={`item_on_menu text-darkred ${theme === 'light' ? 'light-background' : 'dark-background'}`}
                                            onClick={() => handleMenuItemClick(item)}
                                            style={{marginLeft: '-48px'}}
                                        >
                                            {item}
                                        </a>
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
                <button className="btn border-0 change_theme_btn" onClick={toggleTheme}>
                    <BsBrightnessHigh/>
                </button>
                :
                <button className="btn border-0 change_theme_btn" onClick={toggleTheme}>
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
                {user !== null ? null : (
                    <a className="item_on_header text_color" style={{position: 'absolute', right: '5px'}} onClick={() => navigate('/login')}>
                        Login
                    </a>
                )}
            </div>
        </div>
    );
};

export default Header
