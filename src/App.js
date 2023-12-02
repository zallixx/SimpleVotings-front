import './App.css';

import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage";

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/Header";

function App() {
    return (
        <div className="App">
            <Router>
                <Header/>
                <Routes>
                    <Route element={<HomePage/>} path="/"/>
                    <Route element={<LoginPage/>} path="/login"/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
