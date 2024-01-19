import React from "react";

import './Footer.css';

const Footer = () => {
    const A = (text, hreff) => {
        return (<a className="link text_color" href={hreff}>{text}</a>)
    };

    return (
        <div className="footer">
            <div className="hr"></div>
            <div className="footerContent">
                <div className="footerCol">
                    {A('О проекте', '/aboutTheProject/')}
                </div>

                <div className="footerCol">
                    {A('О нас', '/aboutUs/')}
                    {A('Отзывы', '/reviews/')}
                </div>
            </div>
        </div>
    )
};

export default Footer