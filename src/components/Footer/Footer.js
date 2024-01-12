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
                    {A('About the project', '/aboutTheProject/')}
                </div>

                <div className="footerCol">
                    {A('About us', '/aboutUs/')}
                    {A('Reviews', '/reviews/')}
                </div>
            </div>
        </div>
    )
};

export default Footer