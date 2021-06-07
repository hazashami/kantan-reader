import React, { useState } from 'react';

import AuthPanel from '../components/AuthPanel';
import Navigator from '../components/Navigator';
import Reader from '../components/Reader';

import layout from '../styles/layout.css';

const MangadexReader = () => {
    const [ bearer, setBearer ] = useState('');
    const [ refresh, setRefresh ] = useState('');

    return (
        <div id="rootPane" className="rootPane">
            <div id="topPane" className="topPane">
                <AuthPanel bearer={bearer} setBearer={setBearer} refresh={refresh} setRefresh={setRefresh}/>
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