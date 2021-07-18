import React, { useState, useContext } from 'react';

import CoordinatorContext from '../../context/CoordinatorContext';
import layout from '../../styles/layout.css';

const Chapter = ({ chapterInfo }) => {
    const { setViewedChapter, setViewedChapterHash } = useContext(CoordinatorContext);
    const [ isClickedChapter, setIsClickedChapter ] = useState(false);

    const buildChapterString = () => {
        return "ch." + chapterInfo.attributes.chapter + ": " + chapterInfo.attributes.title;
    }

    const handleChapterClick = () => {
        setIsClickedChapter(true);
        setViewedChapter(chapterInfo.attributes.data);
        setViewedChapterHash(chapterInfo.attributes.hash);
    }

    const chapterStyling = () => {
        let classes = "chapter";
        if (isClickedChapter) {
            classes += " activeChapter";
        }
        return classes;
    }

    return (
        <div className={chapterStyling()} >
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