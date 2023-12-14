import { useState } from 'react';
import {
  Container,
  Text,
  Tabs,
  MantineProvider,
} from '@mantine/core';
import {useNavigate} from "react-router-dom";
import {ButtonGroup} from "react-bootstrap";

const user = {
  name: '',
  email: '',
  image: '',
};

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

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleTabClick = (tab) => {
        navigate(tabs[tab])
    }

    const handleMenuItemClick = (item) => {
        const path = menu_items[item];
        if (path) {
            navigate(path);
        }
    };

    const items = Object.keys(tabs).map((tab) => (
        <button className="btn border-0 rounded-0" style={{backgroundColor: 'slategray', color: 'black', }} value={tab} key={tab} onClick={() => handleTabClick(tab)}>
            {tab}
        </button>
      ));

    return (
        <MantineProvider>
            <button className="btn border-0 rounded-0" onClick={handleButtonClick}
                    style={{position: 'absolute', right: 0, backgroundColor: 'slategray', color: 'black', height: '3.2%'}}
            >
                {user.name}
            </button>
            {isOpen && (
                <div style={{position: 'absolute', right: 0, top: '4%'}}>
                    <ButtonGroup>
                        <ul>
                            <button className="btn btn-info mb-2"
                                    onClick={() => handleMenuItemClick('Liked polls')}>
                                Liked polls
                            </button>
                            <br/>
                            <button className="btn btn-info mb-2" onClick={() => handleMenuItemClick('Complains')}>
                                Complains
                            </button>
                            <br/>
                            <button className="btn btn-info mb-2" onClick={() => handleMenuItemClick('Your comments')}>
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
        </MantineProvider>
);
};

export default Header