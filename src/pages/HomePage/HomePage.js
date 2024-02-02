import React from "react";

import './HomePage.css';

const HomePage = () => {
    const A = (text, hreff) => {
        return (<a className="link text_color" href={hreff}>{text}</a>)
    };

    return (
        <div>
            {/* Шапка */}
            <header className="header">
                <div className="headerContent">
                    <div className="headerLeft" style={{ textAlign: 'left', paddingLeft: '40px' }}>
                        <p style={{ textTransform: 'uppercase', fontSize: '80px', whiteSpace: 'pre' }}>
                            Голосуй{"\n"}онлайн{"\n"}с SimpleVoting
                        </p>
                    </div>
                    <div className="headerRight" style={{ marginTop: '50px', paddingRight: '50px' }}>
                        <img src={require('./image.jpeg')} alt="SimpleVoting" />
                    </div>
                </div>
            </header>

            {/* Основная часть (контент) (лендинг page) */}
            <main>
                <div className="BackgroundImage">
                    <div className="homeContent">
                        <div className="menu">
                            <div className="homeCol">
                                {A('Polls', '/polls/')}
                                {A('Settings', '/settings/')}
                            </div>
                            <div className="homeCol">
                                {A('Login', '/login/')}
                                {A('Vote history', '/vote-history')}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Подвал */}
            <footer>
                <p>&copy; 2023 Your Polls App</p>
            </footer>
        </div>
    );
};

export default HomePage;
