import cx from 'clsx';
import { useState } from 'react';
import {
  Container,
  Group,
  Text,
  Menu,
  Tabs,
  MantineProvider,
} from '@mantine/core';
import classes from './Header.module.css';
import {useNavigate} from "react-router-dom";

const user = {
  name: 'Jane Spoonfighter',
  email: 'janspoon@fighter.dev',
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
    const [userMenuOpened, setUserMenuOpened] = useState(false);
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
        console.log(item);
        if (path) {
            navigate(path);
        }
    };

    const items = Object.keys(tabs).map((tab) => (
        <Tabs.Tab value={tab} key={tab} onClick={() => handleTabClick(tab)}>
            {tab}
        </Tabs.Tab>
      ));

    return (
        <MantineProvider>
            <div className={classes.dropdown}>
                <button className={classes.button} onClick={handleButtonClick} style={{ position: 'absolute', right: 0 }}>
                    <Text>{user.name}</Text>
                </button>
                {isOpen && (
                    <div className={classes.menu} style={{ position: 'absolute', right: 0, top: '5%' }}>
                        <ul className={classes.menuItems}>
                            <button className={cx(classes.menuItem)} onClick={() => handleMenuItemClick('Liked polls')}>
                                Liked polls
                            </button>
                            <br/>
                            <button className={cx(classes.menuItem)} onClick={() => handleMenuItemClick('Complains')}>
                                Complains
                            </button>
                            <br/>
                            <button className={cx(classes.menuItem)} onClick={() => handleMenuItemClick('Your comments')}>
                                Your comments
                            </button>
                            <br/>
                            <button className={cx(classes.menuItem)} onClick={() => handleMenuItemClick('Logout')}>
                                Logout
                            </button>
                        </ul>
                    </div>
                )}
            </div>
        </MantineProvider>
    );
};

export default Header