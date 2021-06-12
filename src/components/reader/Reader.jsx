import React, { useEffect, useState } from 'react';

import useKeyHook from '../../hooks/useKeyHook';
import Page from './Page';

const LEFT = -1;
const RIGHT = 1;

const Reader = ({bearer, viewedChapter, viewedChapterHash}) => {
    const [ currentPage, setCurrentPage ] = useState(0);
    const leftPress = useKeyHook("ArrowLeft");
    const rightPress = useKeyHook("ArrowRight");

    useEffect(() => {
        if (leftPress) {
            setCurrentPage(currentPage => 
                currentPage > 0 ? currentPage - 1 : currentPage
            );
        }
    }, [leftPress]);

    useEffect(() => {
        if (rightPress) {
            setCurrentPage(currentPage => 
                currentPage < viewedChapter.length - 1 ? currentPage + 1 : currentPage
            );
        }
    }, [rightPress]);

    const handleClick = (direction) => {
        if (currentPage + direction <= viewedChapter.length && currentPage + direction >= 0) {
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