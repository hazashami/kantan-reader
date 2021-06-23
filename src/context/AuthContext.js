import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [ bearer, setBearer ] = useState('');
    const [ refresh, setRefresh ] = useState('');

    const axiosInstance = axios.create();

    //todo: bearer auth for cors

    let mangadexApi = ""
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        mangadexApi = "https://api.mangadex.org";
    } else {
        mangadexApi = "/api/mangadex"; //nginx proxy-pass
    }
    const mangadexImg = "https://uploads.mangadex.org"

    return(
        <AuthContext.Provider value={{ bearer, setBearer, refresh, setRefresh, axiosInstance, mangadexApi, mangadexImg }} >
            { children }
        </AuthContext.Provider >
    )
}

export default AuthContext;
export { AuthProvider };