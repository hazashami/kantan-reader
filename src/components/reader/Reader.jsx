import React, { useState } from 'react';

import Page from './Page';

const LEFT = -1;
const RIGHT = 1;

const Reader = ({bearer, viewedChapter, viewedChapterHash}) => {
    const [ currentPage, setCurrentPage ] = useState(0);

    const handleClick = (direction) => {
        if (currentPage + direction <= viewedChapter.length || currentPage + direction >= 0) {
            setCurrentPage(currentPage + direction);
        }
    }

    return (
        <div className="reader">
            <div className="arrow" onClick={() => handleClick(LEFT)}>←</div>
            <Page viewedPage={viewedChapter[currentPage]} viewedChapterHash={viewedChapterHash}/>
            <div className="arrow" onClick={() => handleClick(RIGHT)}>→</div>
            <div className="progress">[ {currentPage + 1} / {viewedChapter.length + 1} ]</div>
        </div>
    )
}

export default Reader;