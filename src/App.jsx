import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';

import MangadexReader from './pages/MangadexReader';
import AppContext from './context/AppContext';

const App = () => {
    const axiosInstance = axios.create();
    const mangadexHost = "https://api.mangadex.org"

    return (
        <AppContext.Provider value={{axiosInstance: axiosInstance, mangadexHost: mangadexHost}}>
            <MangadexReader />
        </AppContext.Provider>   
    )
}

export default hot(App);