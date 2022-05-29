import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Login from "./components/Login";
import Admin from "./components/Admin";
import Home from "./components/Home";
import ResetPass from "./components/ResetPass";
import MyNavBar from "./components/MyNavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <MyNavBar />
            <div className="container vm-lg">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/reset_password/:hash' element={<ResetPass />} />
            </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
