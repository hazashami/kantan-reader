import React, { useState } from 'react';

import AuthPanel from '../components/AuthPanel';
import Navigator from '../components/navigator/Navigator';
import Reader from '../components/reader/Reader';

import layout from '../styles/layout.css';

const MangadexReader = () => {
    const [ bearer, setBearer ] = useState('');
    const [ refresh, setRefresh ] = useState('');
    const [ viewedChapter, setViewedChapter ] = useState([]);

    //todo: add bearer to axios interceptor

    return (
        <div id="rootPane" className="rootPane">
            <div id="topPane" className="topPane">
                <AuthPanel bearer={bearer} setBearer={setBearer} refresh={refresh} setRefresh={setRefresh}/>
            </div>
            <div id="bottomPane" className="bottomPane">
                <div id="navigator" className="navigator">
                    <Navigator bearer={bearer} setViewedChapter={setViewedChapter}/>
                </div>
                <div id="reader" className="reader">
                    <Reader bearer={bearer} viewedChapter={viewedChapter}/>
                </div>
            </div>
        </div>
    );
}

export default MangadexReader;