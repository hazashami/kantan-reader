import React from 'react';

import AuthPanel from '../components/AuthPanel';
import Navigator from '../components/navigator/Navigator';
import Reader from '../components/reader/Reader';
import { AuthProvider } from '../context/AuthContext';

import layout from '../styles/layout.css';

const KantanReader = () => {
    return (
        <AuthProvider>
            <div id="rootPane" className="rootPane">
                {/* <div id="topPane" className="topPane">
                    <AuthPanel />
                </div> */}
                <div id="bottomPane" className="bottomPane">
                    <div id="navigator" className="navigator">
                        <Navigator />
                    </div>
                    <div id="reader" className="readerContainer">
                        <Reader />
                    </div>
                </div>
            </div>
        </AuthProvider>
    );
}

export default KantanReader;