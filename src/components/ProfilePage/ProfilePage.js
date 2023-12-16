import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/AuthContext";
import { BsFeather } from "react-icons/bs";
import ReactLoading from "react-loading";

const ProfilePage = () => {
    let {authTokens} = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setLoading] = useState(true);

    const fetchUser = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/profile/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access),
                    },
                });
                const data = await response.json();
                if (response.status === 200) {
                    setUserInfo(data)
                } else {
                    alert('Something went wrong!');
                }
            } catch (error) {
                console.error(error);
            }
        };

    useEffect(() => {
        fetchUser().then(
            () => setLoading(false)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return (
            <ReactLoading className="position-fixed top-50 start-50 translate-middle h3" height={'6%'} width={'6%'}
                          type="bubbles" color="#505253"/>
        )
    }

    return (
        <div className="BasePageCss">
            <div className="body-wrapper">
                <div className="body-inner h-100 w-75">
                    <h3>Настройки</h3>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <h5> Ваш логин: {userInfo.username} </h5>
                        <div style={{marginLeft: '10px', color: '#2980b9', cursor: 'pointer'}}>
                            <BsFeather onClick={() => null}/>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <h5> Ваша почта: {userInfo.email} </h5>
                        <div style={{marginLeft: '10px', color: '#2980b9', cursor: 'pointer'}}>
                            <BsFeather onClick={() => null}/>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <h5> Ваше имя: {userInfo.first_name !== null ? userInfo.first_name : "Не установлено"} </h5>
                        <div style={{marginLeft: '10px', color: '#2980b9', cursor: 'pointer'}}>
                            <BsFeather onClick={() => null}/>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <h5> Ваша фамилия: {userInfo.last_name !== null ? userInfo.last_name : "Не установлено"} </h5>
                        <div style={{marginLeft: '10px', color: '#2980b9', cursor: 'pointer'}}>
                            <BsFeather onClick={() => null}/>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <h5>
                            <a href="#"> Сменить пароль </a>
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;