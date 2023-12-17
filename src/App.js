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
import ComplainsPage from "./components/ComplainsPage/ComplainsPage";
import AnswerForComplainPage from "./components/AnswerForComplainPage/AnswerForComplainPage";
import VoteHistoryPage from "./components/VoteHistoryPage/VoteHistoryPage";
import SettingsPage from "./components/SettingsPage/SettingsPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";

export const ThemeContext = createContext(null)

function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    localStorage.setItem('theme', theme);

    const toggleTheme = () => {
        let themeToSet = (curr) => curr === 'light' ? 'dark' : 'light';
        setTheme(themeToSet(theme));
        localStorage.setItem('theme', themeToSet(theme));
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
                            <Route path="/complains/" element={
                                <PrivateRoute>
                                    <ComplainsPage/>
                                </PrivateRoute>
                            }/>
                            <Route path="/complains/:id" element={
                                <PrivateRoute>
                                    <AnswerForComplainPage/>
                                </PrivateRoute>
                            }/>
                            <Route path="/vote-history/" element={
                                <PrivateRoute>
                                    <VoteHistoryPage/>
                                </PrivateRoute>
                            }/>
                            <Route path="/settings/" element={
                                <PrivateRoute>
                                    <SettingsPage/>
                                </PrivateRoute>
                            }/>
                            <Route path="/users/:id" element={
                                <PrivateRoute>
                                    <ProfilePage/>
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
