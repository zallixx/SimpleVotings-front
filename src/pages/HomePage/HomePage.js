import React from "react";

import './HomePage.css';

const HomePage = () => {
    const A = (text, hreff) => {
        return (<a className="link text_color" href={hreff}>{text}</a>)
    };

    return (
        <div className="BackgroundImage text_color">
            <div className="homeContent">
                <h1 className="mainText">Опросы</h1>
                <div className="menu">
                    <div className="homeCol">
                        {A('Опросы', '/polls/')}
                        {A('Настройки', '/settings/')}
                    </div>

                    <div className="homeCol">
                        {A('Авторизоваться', '/login/')}
                        {A('История голосования', '/vote-history/')}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HomePage