import {useContext, useEffect, useState} from 'react';
import { Container, Tabs, MantineProvider, } from '@mantine/core';
import {useNavigate} from "react-router-dom";
import {ButtonGroup} from "react-bootstrap";
import AuthContext from "../context/AuthContext";

import './Header.css';

const tabs = {
    'Home': '/',
    'Polls' : '/polls/',
    'Complains' : '/complains/',
    'Profile' : '/profile/',
};

const menu_items = {
    'Vote history': '/vote-history/',
    'Mine polls': '/mine-polls/',
    'Logout' : '/login/',
};

const Header = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    let {user} = useContext(AuthContext)
    const [user_prop, setUserProp] = useState({name: 'Login to see your username!'});
    const [activeTab, setActiveTab] = useState(null);

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

    const handleTabClick = (tab) => {
        navigate(tabs[tab]);
        setActiveTab(tab);
    }

    const handleMenuItemClick = (item) => {
        const path = menu_items[item];
        if (path) {
            navigate(path);
        }
        setActiveTab(item);
    };

    const items_tabs = Object.keys(tabs).map((tab) => (
        <button className={`btn border-0 rounded-0 tab ${activeTab === tab ? 'active' : ''}`} value={tab} key={tab}
                onClick={() => handleTabClick(tab)}>
            {tab}
        </button>
    ))

const items_menu = (
    <div>
        {Object.keys(menu_items).map((item) => (
            <div key={item}>
                {item !== 'Logout' && (
                    <button
                        className={`btn border-0 rounded-0 mb-1 tab ${activeTab === item ? 'active' : ''}`}
                        onClick={() => handleMenuItemClick(item)}
                        style={{ backgroundColor: '#ffffff' }}
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
                        className="btn mb-1 text-darkred"
                        onClick={() => handleMenuItemClick(item)}
                        style={{ backgroundColor: '#ffffff' }}
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
            <div className="navbar fixed-top" style={{backgroundColor: '#ffffff', height: '3.2%'}}>
                <button className="dropdown-toggle btn border-0 rounded-start-pill" onClick={handleButtonClick}
                    style={{position: 'absolute', right: 0, backgroundColor: '#ffffff', color: 'black', }}
                >
                {user_prop.name}
            </button>
            {isOpen && (
                <div style={{position: 'absolute', right: 0, top: '100%'}}>
                    <ButtonGroup style={{ backgroundColor: '#ffffff', height: '100%', width: '100%'}} className="shadow">
                        {items_menu}
                    </ButtonGroup>
                </div>
            )}
                <div style={{position: 'absolute', marginTop: '0%', right: '40%', left: '40%'}}>
                    <Container size="md">
                        <Tabs>
                        <Tabs.List>
                            {items_tabs}
                        </Tabs.List>
                    </Tabs>
                </Container>
            </div>
                </div>
        </MantineProvider>
);
};

export default Header