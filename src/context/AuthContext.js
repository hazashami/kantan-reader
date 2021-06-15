import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [ bearer, setBearer ] = useState('');
    const [ refresh, setRefresh ] = useState('');

    const axiosInstance = axios.create();

    //todo:
    // axiosInstance.interceptors.request.use(

    // )

    const mangadexApi = "https://api.mangadex.org"
    const mangadexImg = "https://uploads.mangadex.org"

    return(
        <AuthContext.Provider value={{ bearer, setBearer, refresh, setRefresh, axiosInstance, mangadexApi, mangadexImg }} >
            { children }
        </AuthContext.Provider >
    )
}

export default AuthContext;
export { AuthProvider };