import React, { useContext, useEffect, useState } from 'react';

import AuthContext from '../../context/AuthContext';
import AppContext from '../../context/AppContext';
import useKeyHook from '../../hooks/useKeyHook';
import ProgressBar from './ProgressBar';

const LEFT = -1;
const RIGHT = 1;

const Reader = () => {
    const { mangadexImg } = useContext(AuthContext);
    const { viewedChapter, viewedChapterHash } = useContext(AppContext);
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ imgSet, setImgSet ] = useState([]);
    const leftPress = useKeyHook("ArrowLeft");
    const rightPress = useKeyHook("ArrowRight");

    useEffect(() => {
        setCurrentPage(0);
        setImgSet(
            Object.keys(viewedChapter).map(page => {
                return <img src={mangadexImg + "/data/" + viewedChapterHash + "/" + viewedChapter[page]} />
            })
        );
    }, [viewedChapter]);

    useEffect(() => {
        if (leftPress) {
            setCurrentPage(currentPage => 
                currentPage > 0 ? Number(currentPage - 1) : currentPage
            );
        }
    }, [leftPress]);

    useEffect(() => {
        if (rightPress) {
            setCurrentPage(currentPage => 
                currentPage < viewedChapter.length - 1 ? Number(currentPage + 1) : currentPage
            );
        }
    }, [rightPress]);

    const handleClick = (direction) => {
        if (currentPage + direction <= viewedChapter.length && currentPage + direction >= 0) {
            setCurrentPage(Number(currentPage + direction));
        }
    }

    return (
        <div className="reader">
            <ProgressBar imgSet={imgSet} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="readerDisplay">
                <div className="arrow" onClick={() => handleClick(LEFT)}>←</div>
                <div className="page">
                    {imgSet[currentPage]}
                </div>
                <div className="arrow" onClick={() => handleClick(RIGHT)}>→</div>
            </div>
            <ProgressBar imgSet={imgSet} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default Reader;