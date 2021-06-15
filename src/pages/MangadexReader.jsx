import React, { useState } from 'react';

import AuthPanel from '../components/AuthPanel';
import Navigator from '../components/navigator/Navigator';
import Reader from '../components/reader/Reader';
import { AuthProvider } from '../context/AuthContext';

import layout from '../styles/layout.css';

const MangadexReader = () => {
    const [ viewedChapter, setViewedChapter ] = useState([]);
    const [ viewedChapterHash, setViewedChapterHash ] = useState('');

    return (
        <AuthProvider>
            <div id="rootPane" className="rootPane">
                <div id="topPane" className="topPane">
                    <AuthPanel />
                </div>
                <div id="bottomPane" className="bottomPane">
                    <div id="navigator" className="navigator">
                        <Navigator setViewedChapter={setViewedChapter} 
                            setViewedChapterHash={setViewedChapterHash}/>
                    </div>
                    <div id="reader" className="reader">
                        <Reader viewedChapter={viewedChapter} viewedChapterHash={viewedChapterHash} />
                    </div>
                </div>
            </div>
        </AuthProvider>
    );
}

export default MangadexReader;