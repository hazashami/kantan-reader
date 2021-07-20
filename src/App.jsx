import React from 'react';
import { hot } from 'react-hot-loader/root';

import { CoordinatorProvider } from './context/CoordinatorContext';
import KantanReader from './pages/KantanReader';

const App = () => {

    return (
        <CoordinatorProvider>
            <KantanReader />
        </CoordinatorProvider>
    )
}

export default hot(App);