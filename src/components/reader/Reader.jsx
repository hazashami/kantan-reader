import React, { useContext, useEffect, useState } from 'react';

import AuthContext from '../../context/AuthContext';
import useKeyHook from '../../hooks/useKeyHook';
import Page from './Page';

const LEFT = -1;
const RIGHT = 1;

const Reader = ({ viewedChapter, viewedChapterHash }) => {
    const { mangadexImg } = useContext(AuthContext);
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ imgSet, setImgSet ] = useState([]);
    const leftPress = useKeyHook("ArrowLeft");
    const rightPress = useKeyHook("ArrowRight");

    useEffect(() => {
        setImgSet(
            Object.keys(viewedChapter).map(page => {
                return <img src={mangadexImg + "/data/" + viewedChapterHash + "/" + viewedChapter[page]} />
            })
        );
    }, [viewedChapter]);

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

    const getPieceClass = (entry) => {
        let classes = "progressPiece";
        if (entry == currentPage) {
            classes += " activePiece";
        }
        return classes;
    }

    return (
        <div className="reader">
            <div className="progressBar">
                { imgSet ?
                    Object.keys(imgSet).map((entry) => {
                        return(
                            <div key={viewedChapterHash + '-' + entry} className={getPieceClass(entry)} 
                                style={{width: (100 / imgSet.length) + "%"}} onClick={() => setCurrentPage(entry)}/>
                        )
                    })
                    : <> </>
                }
            </div>
            <div className="readerDisplay">
                <div className="arrow" onClick={() => handleClick(LEFT)}>←</div>
                <div className="page">
                    {imgSet[currentPage]}
                </div>
                <div className="arrow" onClick={() => handleClick(RIGHT)}>→</div>
            </div>

        </div>
    )
}

export default Reader;