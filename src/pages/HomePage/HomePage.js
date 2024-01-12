import React from "react";

import './HomePage.css';

const HomePage = () => {
    const A = (text, hreff) => {
        return (<a className="link text_color" href={hreff}>{text}</a>)
    };

    return (
        <div className="BackgroundImage text_color">
            <div className="homeContent">
                <h1 className="mainText">Polls</h1>
                <div className="menu">
                    <div className="homeCol">
                        {A('Polls', '/polls/')}
                        {A('Settings', '/settings/')}
                    </div>

                    <div className="homeCol">
                        {A('Login', '/login/')}
                        {A('Vote history', '/vote-history/')}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HomePage