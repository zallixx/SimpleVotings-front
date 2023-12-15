import './App.css';

import {createContext, useState} from "react";
import HomePage from './pages/HomePage';
import {AuthProvider} from "./context/AuthContext";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import PrivateRoute from "./utils/PrivateRoute";
import LoginPage from './components/LoginPage/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from "./components/RegisterPage/RegisterPage";
import PollsPage from "./components/PollsPage/PollsPage";
import PollPage from "./components/PollPage/PollPage";
import NewPollPage from "./components/NewPollPage/NewPollPage";
import ResultPage from "./components/ResultPage/ResultPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

export const ThemeContext = createContext(null)

function App() {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <div className="App" id={theme}>
                <Router>
                    <AuthProvider>
                        <Header/>
                        <Routes>
                            <Route path="/" element={
                                <PrivateRoute>
                                    <HomePage/>
                                </PrivateRoute>
                            }/>
                            <Route path="/polls" element={
                                <PrivateRoute>
                                    <PollsPage/>
                                </PrivateRoute>
                            }/>
                            <Route path="/polls/:id" element={
                                <PrivateRoute>
                                    <PollPage/>
                                </PrivateRoute>
                            }/>
                            <Route path="/polls/:id/results" element={
                                <PrivateRoute>
                                    <ResultPage/>
                                </PrivateRoute>
                            }/>
                            <Route path="/polls/new/" element={
                                <PrivateRoute>
                                    <NewPollPage/>
                                </PrivateRoute>
                            }/>
                            <Route element={<LoginPage/>} path="/login"/>
                            <Route element={<RegisterPage/>} path="/register"/>
                            <Route element={<NotFoundPage/>} path="*"/>
                        </Routes>
                    </AuthProvider>
                </Router>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
