import React, { useContext, useEffect, useState } from 'react';

import AuthContext from '../../context/AuthContext';
import CoordinatorContext from '../../context/CoordinatorContext';
import useCoordinator from '../../hooks/useCoordinator';
import useKeyHook from '../../hooks/useKeyHook';
import ProgressBar from './ProgressBar';

const LEFT = -1;
const RIGHT = 1;

const Reader = () => {
    const { mangadexImg } = useContext(AuthContext);
    const { currentChapterData, currentPage, setCurrentPage } = useContext(CoordinatorContext);
    const { getNext } = useCoordinator();
    const [ imgSet, setImgSet ] = useState([]);
    const leftPress = useKeyHook("ArrowLeft");
    const rightPress = useKeyHook("ArrowRight");

    useEffect(() => {
        setCurrentPage(0);
        if (currentChapterData && currentChapterData.data) {
            setImgSet(
                Object.keys(currentChapterData.data).map(page => {
                    return <img src={mangadexImg + "/data/" + currentChapterData.hash + "/" + currentChapterData.data[page]} />
                })
            );
        }

    }, [currentChapterData]);

    useEffect(() => {
        if (leftPress) {
            getNext(LEFT);
        }
    }, [leftPress]);

    useEffect(() => {
        if (rightPress) {
            getNext(RIGHT);
        }
    }, [rightPress]);

    return (
        <div className="reader">
            <ProgressBar imgSet={imgSet} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="readerDisplay">
                <div className="arrow" onClick={() => getNext(LEFT)}>←</div>
                <div className="page">
                    {imgSet[currentPage]}
                </div>
                <div className="arrow" onClick={() => getNext(RIGHT)}>→</div>
            </div>
            <ProgressBar imgSet={imgSet} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default Reader;