import React, { useContext, useState } from 'react';

import Navigator from '../components/navigator/Navigator';
import Reader from '../components/reader/Reader';
import { AuthProvider } from '../context/AuthContext';
import CoordinatorContext from '../context/CoordinatorContext';

import layout from '../styles/layout.css';

const KantanReader = () => {
    const { currentChapterData } = useContext(CoordinatorContext);
    const [ navVisible, setNavVisible ] = useState(true);

    const ktrGuide = "https://github.com/ijcresse/kantan-reader/blob/develop/GUIDE.md";

    return (
        <AuthProvider>
            <div className="rootPane">
                <div className="topPane">
                    <div className="searchToggle" onClick={() => setNavVisible(!navVisible)}>
                        toggle searchbox
                    </div>
                    <div className="currentlyReading">
                        { currentChapterData ? "ch " + currentChapterData.chapter + ": " + currentChapterData.title : "" }
                    </div>
                    <a className="link" href={ktrGuide} target="_blank">
                        Kantan Reader Guide
                    </a>
                    <div className="pageTitle">
                        かんたん・リーダー
                    </div>
                </div>
                <div className="bottomPane">
                    <div className={navVisible ? "navigator" : "navigator hide"}>
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