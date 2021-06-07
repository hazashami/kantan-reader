import React, { useState, useContext } from 'react';

import AppContext from '../context/AppContext';

import layout from '../styles/layout.css';

const AuthPanel = () => {
    const { axiosInstance, mangadexHost } = useContext(AppContext);

    const [ loginInfo, setLoginInfo ] = useState({
        "username": '',
        "password": ''
    });
    const [ bearer, setBearer ] = useState('');
    const [ bearerRefresh, setBearerRefresh ] = useState('');

    const handleInputChange = (event) => {
        if (event.target instanceof HTMLInputElement) {
            setLoginInfo({...loginInfo, [event.target.name]: event.target.value});
        }
    }

    const login = () => {
        axiosInstance.post(mangadexHost + "/auth/login", loginInfo)
        .then((response) => {
            setBearer(response.data.token.session);
            setBearerRefresh(response.data.token.refresh);
        })
        .catch((err) => {
            alert(err.message);
        });
    }

    return (
        <form className="authPanelForm" onSubmit={ev => {ev.preventDefault()}}>
            <div className="loginPanel">
                <label className="authLabel">Username:</label>
                <input className="authInput" name="username" type="text" value={loginInfo["username"]} onChange={handleInputChange} />
                <label className="authLabel">Password:</label>
                <input className="authInput" name="password" type="password" value={loginInfo["password"]} onChange={handleInputChange} />
                <button className="loginButton" onClick={login}>Login</button>
            </div>
            <div className="bearerPanel">
                <label className="authLabelBearer">Bearer Auth:</label>
                <input className="authInput" name="bearer" type="text" value={bearer} readOnly={true} placeholder="read only" />
                <label className="authLabelBearerRefresh">Refresh token:</label>
                <input className="authInput" name="bearerRefresh" type="text" value={bearerRefresh} readOnly={true} placeholder="read only" />
            </div>
        </form>
    )
}

export default AuthPanel;