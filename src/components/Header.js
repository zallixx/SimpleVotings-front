import {useContext, useEffect, useState} from 'react';
import {
  Container,
  Tabs,
  MantineProvider,
} from '@mantine/core';
import {useNavigate} from "react-router-dom";
import {ButtonGroup} from "react-bootstrap";
import AuthContext from "../context/AuthContext";

import './Header.css';

const tabs = {
    'Home': '/',
    'Polls' : '/polls/',
    'Support' : '/support/',
    'Profile' : '/profile/',
};

const menu_items = {
    'Liked polls': '/liked-polls/',
    'Complains' : '/complains/',
    'Your comments' : '/your-comments/',
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
    };

    const items = Object.keys(tabs).map((tab) => (
      <button className={`btn border-0 rounded-0 tab ${activeTab === tab ? 'activeTab' : ''}`} value={tab} key={tab} onClick={() => handleTabClick(tab)}>
        {tab}
      </button>
    ))
    return (
        <MantineProvider>
            <div className="navbar fixed-top" style={{ backgroundColor: '#ffffff', height: '3.2%' }}>
            <button className="btn border-0 rounded-start-pill" onClick={handleButtonClick}
                    style={{position: 'absolute', right: 0, backgroundColor: '#ffffff', color: 'black', }}
            >
                {user_prop.name}
            </button>
            {isOpen && (
                <div style={{position: 'absolute', right: 0, top: '100%'}}>
                    <ButtonGroup>
                        <ul>
                            <button className="btn mb-2 " onClick={() => handleMenuItemClick('Liked polls')} style={{ backgroundColor: '#b7e9eb', }}>
                                Liked polls
                            </button>
                            <br/>
                            <button className="btn mb-2"  onClick={() => handleMenuItemClick('Complains')} style={{ backgroundColor: '#b7e9eb', }}>
                                Complains
                            </button>
                            <br/>
                            <button className="btn mb-2" onClick={() => handleMenuItemClick('Your comments')} style={{ backgroundColor: '#b7e9eb', }}>
                                Your comments
                            </button>
                            <br/>
                            <button className="btn btn-danger mb-2" onClick={() => handleMenuItemClick('Logout')}>
                                Logout
                            </button>
                        </ul>
                    </ButtonGroup>
                </div>
            )}
            <div style={{position: 'absolute', marginTop: '0%', right: '40%', left: '40%'}}>
                <Container size="md">
                    <Tabs>
                        <Tabs.List>
                            {items}
                        </Tabs.List>
                    </Tabs>
                </Container>
            </div>
                </div>
        </MantineProvider>
);
};

export default Header