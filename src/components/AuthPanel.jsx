import React, { useState, useContext } from 'react';

import AppContext from '../context/AppContext';

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
            <label className="authLabel">Username:</label>
            <input name="username" className="authInput" type="text" value={loginInfo["username"]} onChange={handleInputChange} />
            <label className="authLabel">Password:</label>
            <input name="password" className="authInput" type="password" value={loginInfo["password"]} onChange={handleInputChange} />
            <button className="loginButton" onClick={login}>Login</button>
            <label className="authLabelBearer">Bearer Auth:</label>
            <input name="bearer" className="authInput" type="text" value={bearer} readOnly={true} placeholder="read only" />
            <input name="bearerRefresh" className="authInput" type="text" value={bearerRefresh} readOnly={true} placeholder="read only" />
        </form>
    )
}

export default AuthPanel;