import React, { createContext, useState } from 'react';

const CoordinatorContext = createContext({});

const CoordinatorProvider = ({ children }) => {
    const [ volumeList, setVolumeList ] = useState();
    const [ currentVolume, setCurrentVolume ] = useState();
    const [ currentChapter, setCurrentChapter ] = useState();
    const [ currentChapterFiles, setCurrentChapterFiles ] = useState([]);
    const [ currentChapterHash, setCurrentChapterHash ] = useState('');
    const [ currentPage, setCurrentPage ] = useState(0);

    const coordState = {
        volumeList, setVolumeList,
        currentVolume, setCurrentVolume,
        currentChapter, setCurrentChapter,
        currentChapterFiles, setCurrentChapterFiles,
        currentChapterHash, setCurrentChapterHash,
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