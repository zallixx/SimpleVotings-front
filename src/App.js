import './App.css';

import {createContext, useState} from "react";
import HomePage from './pages/HomePage/HomePage';
import {AuthProvider} from "./context/AuthContext";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/Header/Header";
import PrivateRoute from "./utils/PrivateRoute";
import LoginPage from './pages/LoginPage/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import PollsPage from "./pages/PollsPage/PollsPage";
import PollPage from "./pages/PollPage/PollPage";
import NewPollPage from "./pages/NewPollPage/NewPollPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import ComplainsPage from "./pages/ComplainsPage/ComplainsPage";
import AnswerForComplainPage from "./pages/AnswerForComplainPage/AnswerForComplainPage";
import VoteHistoryPage from "./pages/VoteHistoryPage/VoteHistoryPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

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
