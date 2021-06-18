import React from 'react';
import { hot } from 'react-hot-loader/root';

import KantanReader from './pages/KantanReader';
import { AppProvider } from './context/AppContext';

//kantan reader
const App = () => {

    return (
        <AppProvider >
            <KantanReader />
        </AppProvider>
    )
}

export default hot(App);