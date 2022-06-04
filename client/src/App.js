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
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Spinner from "./components/Spinner";
import Alert from "./components/Alert";
import Privacy from "./components/Privacy";

function App() {
    const [user, setUser] = useState({placeholder: true});
    useEffect(() => {
        fetch('http://localhost:5000/me')
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
            <Spinner />
        )
    } else if (user?.error) {
        return (
            <div className="container vm-lg">
                <Alert status='danger'>
                    Server error! Please contact site administrator.
                </Alert>
            </div>
        )
    }

    return (
        <HashRouter>
            <MyNavBar user={user} setUser={setUser} />
            <div className="container vm-lg">
                <Routes>
                    <Route path='/' element={user ? <Home admin={user.admin} /> : <Navigate to='/login' />} />
                    <Route path='/login' element={!user ? (
                        <Login setUser={setUser} />
                        ) : (
                        <Navigate to='/' />
                    ) } />
                    <Route path='/admin' element={user?.admin ? (
                        <Admin curUser={user} />
                        ) : (
                        <Navigate to='/' />
                        )} />
                    <Route path='/reset_password/:hash' element={<ResetPass />} />
                    <Route path='/privacy' element={<Privacy />} />
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
