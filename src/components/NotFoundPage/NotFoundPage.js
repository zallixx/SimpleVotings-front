import './NotFoundPage.css';
import {useNavigate} from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate()
    return (
        <div className="root text_color">
            <div className="label">404</div>
            <p className="title">Кажется ты нашёл секретное место.</p>
            <p className="description">
                Но, к сожалению, это всего-навсего страница с ошибкой 404. Возможно, ты ошибся в адресе, или страница была
                перемещена на другой адрес.
            </p>
            <div className="justify-content-center">
                <button className="btn my-2 rounded-pill shadow-lg background_color_of_btns my-3" onClick={() => navigate('/')}>
                    Верните меня на главную страницу
                </button>
            </div>
        </div>
    );
}

export default NotFoundPage;