import React, { useContext } from 'react';

import AppContext from '../context/AppContext';
import AuthPanel from '../components/AuthPanel';
import Navigator from '../components/Navigator';
import Reader from '../components/Reader';

import layout from '../styles/layout.css';

const MangadexReader = () => {
    const { axiosInstance } = useContext(AppContext);

    return (
        <div id="rootPane" className="rootPane">
            <div id="topPane" className="topPane">
                <AuthPanel />
            </div>
            <div id="bottomPane" className="bottomPane">
                <div id="navigator" className="navigator">
                    <Navigator />
                </div>
                <div id="reader" className="reader">
                    <Reader />
                </div>
            </div>
        </div>
    );
}

export default MangadexReader;