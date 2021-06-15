import React from 'react';
import { hot } from 'react-hot-loader/root';

import MangadexReader from './pages/MangadexReader';
import { AppProvider } from './context/AppContext';

//kantan reader
const App = () => {

    return (
        <AppProvider >
            <MangadexReader />
        </AppProvider>
    )
}

export default hot(App);