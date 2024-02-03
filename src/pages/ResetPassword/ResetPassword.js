import React, {useState} from 'react';
import {Button, Form, FormControl} from "react-bootstrap";
import {useParams} from "react-router-dom";


const ResetPasswordPage = () => {
    const { uidb64, token } = useParams();
    const [new_param, setNewParam] = useState("");
    const [new_param1, setNewParam1] = useState("");

    const resetPassword = async (event) => {
        event.preventDefault();
        if (new_param !== new_param1) {
            alert("Passwords don't match");
        }
        else {
            fetch('http://127.0.0.1:8000/api/reset_password/' + uidb64 + '/' + token + '/' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: new_param,
                })
            }).then((response) => {
                if (response.status === 200) {
                    alert(response.statusText);
                }
                else {
                    alert(response.statusText);
                }
            })
        }
    }
    return (
        <div className="BasePageCss">
            <div className="body-wrapper">
                <div className="body-inner">
                    <Form onSubmit={resetPassword}>
                        <h3 style={{textAlign: 'center'}}>Изменить пароль</h3>
                        <small style={{float: 'left'}}>
                            Введите новый пароль
                        </small>
                        <FormControl type="password" name="password" className="form-control mt-3"
                                     placeholder="New Password" onChange={(e) => setNewParam(e.target.value)}/>
                        <small style={{float: 'left'}}>
                            Повторите новый пароль
                        </small>
                        <FormControl type="password" name="password2" className="form-control mt-3"
                                     placeholder="Repeat New Password" onChange={(e) => setNewParam1(e.target.value)}/>
                        <Button style={{width: '100%', marginTop: '10px', marginBottom: '10px', height: '50px', fontSize: '20px', fontWeight: 'bold', textAlign: 'center', borderRadius: '10px', }} variant="primary" type="submit" className="mt-3">
                            Отправить
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
};

export default ResetPasswordPage
