import {useContext, useEffect, useState} from 'react';
import { Container, Tabs, MantineProvider, } from '@mantine/core';
import {useNavigate} from "react-router-dom";
import {ButtonGroup} from "react-bootstrap";
import AuthContext from "../context/AuthContext";

import './Header.css';

const authorized_tabs = {
    'Home': '/',
    'Polls' : '/polls/',
    'Complains' : '/complains/',
    'Profile' : '/profile/',
};

const unauthorized_tabs = {
    'Login' : '/login/',
    'Register' : '/register/',
}

const menu_items = {
    'Vote history': '/vote-history/',
    'Mine polls': '/mine-polls/',
    'Logout' : '/login/',
};

const Header = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [user_prop, setUserProp] = useState({name: 'Login to see your username!'});
    const [activeTab, setActiveTab] = useState(null);
    let {user, logoutUser} = useContext(AuthContext);

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
        <button className={`btn border-0 rounded-0 tab ${activeTab === tab ? 'active' : ''}`} value={tab} key={tab}
                onClick={() => handleAuthorizedTabClick(tab)}>
            {tab}
        </button>
    ))

    const unauthorized_items = Object.keys(unauthorized_tabs).map((tab) => (
        <button className={`btn border-0 rounded-0 tab ${activeTab === tab ? 'active' : ''}`} value={tab} key={tab}
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
                        className={`btn border-0 rounded-0 tab ${activeTab === item ? 'active' : ''}`}
                        onClick={() => handleMenuItemClick(item)}
                        style={{ backgroundColor: '#DFDFDE' }}
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
                        className="btn mb-0 text-darkred"
                        onClick={() => handleMenuItemClick(item)}
                        style={{ backgroundColor: '#DFDFDE' }}
                    >
                        {item}
                    </button>
                )}
            </div>
        ))}
    </div>
);

    return (
        <MantineProvider>
            <div className="navbar fixed-top" style={{backgroundColor: '#DFDFDE', height: '3.2%'}}>
                {user !== null ?
                    <button className="dropdown-toggle btn border-0" onClick={handleButtonClick}
                            style={{position: 'absolute', right: 0, backgroundColor: '#DFDFDE', color: 'black', height: '100%'}}
                    >
                        {user_prop.name}
                    </button>
                    : null
                }
            {isOpen && (
                <div style={{position: 'absolute', right: 0, top: '100%'}}>
                    <ButtonGroup style={{ backgroundColor: '#DFDFDE', height: '100%', width: '100%'}} className="shadow">
                        {user !== null ? items_menu : null}
                    </ButtonGroup>
                </div>
            )}
                <div style={{position: 'absolute', marginTop: '0%', right: '40%', left: '40%'}}>
                    <Container size="md">
                        <Tabs>
                        <Tabs.List>
                        {user !== null ? items_tabs : unauthorized_items}
                        </Tabs.List>
                    </Tabs>
                </Container>
            </div>
                </div>
        </MantineProvider>
);
};

export default Header