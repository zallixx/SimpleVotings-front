import './App.css';

import HomePage from './pages/HomePage';

import {AuthProvider} from "./context/AuthContext";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import PrivateRoute from "./utils/PrivateRoute";
import LoginPage from './components/LoginPage/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from "./components/RegisterPage/RegisterPage";

function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <Header/>
                    <Routes>
                        <Route path="/" element={
                            <PrivateRoute>
                                <HomePage/>
                            </PrivateRoute>
                        }/>
                        <Route element={<LoginPage/>} path="/login"/>
                        <Route element={<RegisterPage/>} path="/register"/>
                    </Routes>
                </AuthProvider>
            </Router>

        </div>
    )
        ;
}

export default App;
