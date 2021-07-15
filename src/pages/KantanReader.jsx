import React, { useState } from 'react';

import Navigator from '../components/navigator/Navigator';
import Reader from '../components/reader/Reader';
import { AuthProvider } from '../context/AuthContext';

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
        </AuthProvider>
    );
}

export default KantanReader;