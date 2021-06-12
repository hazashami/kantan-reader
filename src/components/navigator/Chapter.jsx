import React, { useEffect } from 'react';

import layout from '../../styles/layout.css';

const Chapter = ({chapterInfo, setViewedChapter, setViewedChapterHash}) => {

    const buildChapterString = () => {
        return "ch." + chapterInfo.attributes.chapter + ": "
                + chapterInfo.attributes.title + " (" + chapterInfo.attributes.translatedLanguage + ")";
    }

    const handleChapterClick = () => {
        setViewedChapter(chapterInfo.attributes.data);
        setViewedChapterHash(chapterInfo.attributes.hash);
    }

    return (
        <div className="chapter" >
            { chapterInfo ? 
                <span className="titleLink" onClick={handleChapterClick}>
                    {buildChapterString()}
                </span> :
                <></>
            }
        </div>
    )
}

export default Chapter;