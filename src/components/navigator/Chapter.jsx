import React, { useContext } from 'react';

import AppContext from '../../context/AppContext';

import layout from '../../styles/layout.css';

const Chapter = ({chapterInfo, setViewedChapterId}) => {
    const { axiosInstance, mangadexHost } = useContext(AppContext);

    const buildChapterString = () => {
        return chapterInfo + " myu";
    }

    
    // const buildChapterString = () => {
    //     const vol = "vol" + chapter.data.attributes.volume;
    //     const ch = "ch" + chapter.data.attributes.chapter;
    //     const title = chapter.data.attributes.title;
    //     const lang = '(' + chapter.data.attributes.translatedLanguage + ')';
    //     return vol + ch + ": " + title + " " + lang;
    // }

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