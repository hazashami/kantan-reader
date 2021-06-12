import React from 'react';

import layout from '../../styles/layout.css';

const Chapter = ({chapterInfo, setViewedChapter}) => {

    const buildChapterString = () => {
        return "ch." + chapterInfo.attributes.chapter + ": "
                + chapterInfo.attributes.title + " (" + chapterInfo.attributes.translatedLanguage + ")";
    }

    const handleChapterClick = () => {
        setViewedChapter(chapterInfo.attributes.data);
    }

    return (
        <div className="chapter" >
            { chapterInfo ? 
                <span className="titleLink" onClick={() => handleChapterClick()}>
                    {buildChapterString()}
                </span> :
                <></>
            }
        </div>
    )
}

export default Chapter;