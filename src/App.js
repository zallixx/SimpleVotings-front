import './App.css';

import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage";

import {AuthProvider} from "./context/AuthContext";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import PrivateRoute from "./utils/PrivateRoute";

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
                    </Routes>
                </AuthProvider>
            </Router>

        </div>
    );
}

export default App;
