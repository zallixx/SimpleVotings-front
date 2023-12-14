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

const Header = () => {
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const navigate = useNavigate()

    const handleTabClick = (tab) => {
        navigate(tabs[tab])
    }
      const items = Object.keys(tabs).map((tab) => (
        <Tabs.Tab value={tab} key={tab} onClick={() => handleTabClick(tab)}>
          {tab}
        </Tabs.Tab>
      ));
    return (
    <MantineProvider>
        <div className={classes.header}>
            <Container className={classes.mainSection + "navbar fixed-top flex-md-nowrap p-0"} size="md">
                <Group justify="space-between">
                    <Menu
                        width={260}
                        position="bottom-end"
                        transitionProps={{transition: 'pop-top-right'}}
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                        withinPortal
                    >
                        <Menu.Target>
                            <button
                                className={cx(classes.user, {[classes.userActive]: userMenuOpened})}
                                style={{ position: 'absolute', right: 0 }}
                            >
                                <Group gap={5}>
                                    <Text fw={1} size="sm" lh={1} mr={1}>
                                        {user.name}
                                    </Text>
                                </Group>
                            </button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item>
                                Liked polls
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item>
                                Complains
                            </Menu.Item>
                            <Menu.Item>
                                Your comments
                            </Menu.Item>

                            <Menu.Label>Settings</Menu.Label>
                            <Menu.Item>
                                Account settings
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item>
                                Change account
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item>
                                Logout
                            </Menu.Item>

                            <Menu.Divider/>

                            <Menu.Label>Danger zone</Menu.Label>
                            <Menu.Item>
                                Delete account
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Container>
            <Container size="md">
                <Tabs
                    defaultValue="Home"
                    variant="outline"
                    visibleFrom="sm"
                    classNames={{
                        root: classes.tabs,
                        list: classes.tabsList,
                        tab: classes.tab,
                    }}
                >
                    <Tabs.List>{items}</Tabs.List>
                </Tabs>
            </Container>
        </div>
    </MantineProvider>
    )
};

export default Header