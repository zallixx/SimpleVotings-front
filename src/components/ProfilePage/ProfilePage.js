import React, {useContext} from "react";
import AuthContext from "../../context/AuthContext";
import { BsPencilFill } from "react-icons/bs";

const ProfilePage = () => {
    let {user} = useContext(AuthContext);

    return (
        <div className="BasePageCss">
            <div className="body-wrapper">
                <div className="body-inner h-100 w-75">
                    <h3>Ваш профиль</h3>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <h5> Ваш логин: {user.username} </h5>
                        <div style={{marginLeft: '10px', color: '#2980b9', cursor: 'pointer'}}>
                            <BsPencilFill/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;