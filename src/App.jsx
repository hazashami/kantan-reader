import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';

import MangadexReader from './pages/MangadexReader';
import AppContext from './context/AppContext';

const App = () => {
    const axiosInstance = axios.create();

    return (
        <AppContext.Provider value={{axiosInstance: axiosInstance}}>
            <MangadexReader />
        </AppContext.Provider>   
    )
}

export default hot(App);