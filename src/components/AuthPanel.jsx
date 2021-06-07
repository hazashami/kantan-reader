import axios from 'axios';
import React, { useState, useContext } from 'react';

import AppContext from '../context/AppContext';

const AuthPanel = () => {
    const { axiosInstance } = useContext(AppContext);

    const [ loginInfo, setLoginInfo ] = useState({
        "username": '',
        "password": ''
    });
    const [ bearer, setBearer ] = useState('');

    const handleInputChange = (event) => {
        if (event.target instanceof HTMLInputElement) {
            console.log(event.target.name);
            console.log(event.target.value);
            setLoginInfo({...loginInfo, [event.target.name]: event.target.value});
        }
    }

    const login = () => {
        axios.get(host + "/auth/login", loginInfo)
        .then((response) => {
            console.log(response);
            setBearer(response.token.session);
        })
        .catch((err) => {
            console.err(err);
        });
    }

    return (
        <form className="authPanelForm">
            <label className="authLabel">Username:</label>
            <input name="username" className="authInput" type="text" value={loginInfo["username"]} onChange={handleInputChange} />
            <label className="authLabel">Password:</label>
            <input name="password" className="authInput" type="password" value={loginInfo["password"]} onChange={handleInputChange} />
            <label className="authLabelBearer">Bearer Auth:</label>
            <input name="bearer" className="authInput" type="text" value={bearer} 
                readOnly={true} placeholder="read only" onChange={handleInputChange} />
        </form>
    )
}

export default AuthPanel;