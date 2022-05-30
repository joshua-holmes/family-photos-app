import React, { useEffect, useState } from "react";
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
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
    const [user, setUser] = useState({placeholder: true});
    useEffect(() => {
        fetch('/me')
        .then(r => r.json())
        .then(body => {
            if (body.ok) {
                setUser(body.data.user);
            } else {
                setUser();
            }
        }).catch(e => {
            console.error("HOUSTON we have a problem... ==>", e)
            setUser({error: e})
        })
    }, [])

    if (user?.placeholder) {
        return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    } else if (user?.error) {
        return (
            <div className="container vm-lg">
                <div className='alert alert-danger mt-5' role="alert">
                    Server error! Please contact site administrator.
                </div>
            </div>
        )
    }

    return (
        <BrowserRouter>
            <MyNavBar user={user} setUser={setUser} />
            <div className="container vm-lg">
            <Routes>
                <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
                <Route path='/login' element={!user ? (
                    <Login setUser={setUser} />
                    ) : (
                    <Navigate to='/' />
                ) } />
                <Route path='/admin' element={user?.admin ? (
                    <Admin />
                    ) : (
                    <Navigate to='/' />
                    )} />
                <Route path='/reset_password/:hash' element={<ResetPass />} />
            </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
