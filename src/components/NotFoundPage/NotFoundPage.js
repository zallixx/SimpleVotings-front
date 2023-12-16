import { Title, Text, Container, Group, MantineProvider } from '@mantine/core';
import classes from './NotFoundPage.module.css';
import {useNavigate} from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate()
    return (
    <MantineProvider>
        <div className="text_color">
        <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>You have found a secret place.</Title>
            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
                been moved to another URL.
            </Text>
            <Group justify="center">
                <button className="btn my-2 rounded-pill shadow-lg background_color_of_btns my-3" onClick={() => navigate('/')}>
                    Take me back to home page
                </button>
            </Group>
        </Container>
        </div>
    </MantineProvider>
    );
}

export default NotFoundPage;