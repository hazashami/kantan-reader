import React, { useState } from 'react';

import Navigator from '../components/navigator/Navigator';
import Reader from '../components/reader/Reader';
import { AuthProvider } from '../context/AuthContext';
import { CoordinatorProvider } from '../context/CoordinatorContext';

import layout from '../styles/layout.css';

const KantanReader = () => {
    const [ navVisible, setNavVisible ] = useState(true);

    const getNavigatorClass = () => {
        let classNames = "navigator";
        if (!navVisible) {
            classNames += " hide";
        }
        return classNames;
    }

    return (
        <AuthProvider>
            <CoordinatorProvider>
                <div className="rootPane">
                    <div className="topPane">
                        <div className="searchToggle" onClick={() => setNavVisible(!navVisible)}>
                            toggle search 🔎
                        </div>
                        <div className="pageTitle">
                            かんたん・リーダー
                        </div>
                    </div>
                    <div className="bottomPane">
                        <div className={getNavigatorClass()}>
                            <Navigator />
                        </div>
                        <div className="readerContainer">
                            <Reader />
                        </div>
                    </div>
                </div>
            </CoordinatorProvider>
        </AuthProvider>
    );
}

export default KantanReader;