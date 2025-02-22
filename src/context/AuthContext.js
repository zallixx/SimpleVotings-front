import {createContext, useEffect, useState} from 'react'
import {jwtDecode} from 'jwt-decode'
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {


    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'password': e.target.password.value
            })
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        } else {
            alert('Something went wrong!')
        }
    }
    let registerUser = async (e) => {
        e.preventDefault()
        if (e.target.password.value !== e.target.password2.value) {
            alert('Passwords do not match!')
            return
        }
        let response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': e.target.email.value,
                'username': e.target.username.value,
                'password': e.target.password.value,

            })
        })
        if (response.status === 201) {
            navigate('/login')
        } else {
            alert('Something went wrong!')
        }
    }
    let updateToken = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'refresh': authTokens.refresh
            })
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }
        if (loading) {
            setLoading(false)
        }
    }
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }
    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
        authTokens: authTokens,
    }

    useEffect(() => {
        if (loading) {
            if (authTokens) {
                updateToken()
            }
        }
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)
        return () => {
            clearInterval(interval)
        };     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
