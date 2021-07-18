import React, { createContext, useState } from 'react';

const CoordinatorContext = createContext({});

const CoordinatorProvider = ({ children }) => {
    const [ volumeList, setVolumeList ] = useState();
    const [ chapterList, setChapterList ] = useState();
    const [ viewedChapterHash, setViewedChapterHash ] = useState('');
    const [ viewedChapter, setViewedChapter ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(0);

    const coordState = {
        volumeList, setVolumeList,
        chapterList, setChapterList,
        viewedChapter, setViewedChapter,
        viewedChapterHash, setViewedChapterHash,
        currentPage, setCurrentPage
    }

    return(
        <CoordinatorContext.Provider value={ coordState } >
            { children }
        </CoordinatorContext.Provider >
    )
}

export default CoordinatorContext;
export { CoordinatorProvider };