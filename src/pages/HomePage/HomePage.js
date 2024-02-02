import React from "react";
import {useNavigate} from "react-router-dom";

import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const surveyInfoData = [{
        title: "Создавайте свои опросы",
        text: "Создавайте свои уникальные опросы и получайте обратную связь от участников, чтобы собрать разнообразные мнения.",
    }, {
        title: "Принимайте участие",
        text: "Принимайте активное участие в опросах, голосуя за интересные темы и внося свой вклад в формирование общего мнения.",
    }, {
        title: "Быстрые результаты",
        text: "Получайте быстрые и точные результаты ваших опросов.",
    },];

    return (
        <div className="home-page-container">
            <div className="home-container text_color">
                <div className="home-banner-container">
                    <div className="home-text-section">
                        <h1 className="primary-heading">
                            Участвуйте в наших опросах или создайте собственные опросы
                        </h1>
                        <p className="primary-text">
                            Принимайте участие в опросах и влияйте на результаты опросов. Ваше мнение важно для каждого!
                        </p>
                        <button className="secondary-button btn-primary btn" onClick={() => navigate('/register')}>
                            Зарегестрироваться
                        </button>
                    </div>
                </div>
            </div>
            <div className="about-section-container text_color">
                <div className="about-section-text-container">
                    <h1 className="primary-heading">
                        Голосования: Ваш Голос Имеет Значение
                    </h1>
                    <p className="primary-text">
                        Создавайте свои голосования и участвуйте в опросах других участников. Вместе мы делаем наш
                        сервис местом для активного участия в различных голосованиях и получения результатов.
                    </p>
                </div>
            </div>
            <div className="work-section-wrapper text_color">
                <div className="work-section-top">
                    <h1 className="primary-heading">Как это работает</h1>
                    <p className="primary-text">
                        Узнайте, как просто и увлекательно участвовать в наших опросах. Давайте вместе формировать
                        мнения!
                    </p>
                </div>
                <div className="work-section-bottom">
                    {surveyInfoData.map((data) => (
                        <div className="work-section-info" key={data.title}>
                            <h2>{data.title}</h2>
                            <p>{data.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
