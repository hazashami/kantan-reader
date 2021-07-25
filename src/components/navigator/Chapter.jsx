import React, { useState, useContext } from 'react';

import CoordinatorContext from '../../context/CoordinatorContext';

import layout from '../../styles/layout.css';

const Chapter = ({ chapterInfo, volumeId }) => {
    const { setCurrentVolume, setCurrentChapterData } = useContext(CoordinatorContext);
    const [ isClickedChapter, setIsClickedChapter ] = useState(false);

    const buildChapterString = () => {
        return "ch." + chapterInfo.attributes.chapter + ": " + chapterInfo.attributes.title;
    }

    const handleChapterClick = () => {
        setIsClickedChapter(true);
        setCurrentVolume(volumeId);
        setCurrentChapterData(chapterInfo.attributes);
        // setCurrentChapter(chapterInfo.attributes.chapter);
        // setCurrentChapterFiles(chapterInfo.attributes.data);
        // setCurrentChapterHash(chapterInfo.attributes.hash);
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