import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';

import MangadexReader from './pages/MangadexReader';

const App = () => {
    const axiosInstance = axios.create();

    return (
        <>
            <MangadexReader />
        </>
        
    )
}

export default hot(App);