import React, { createContext, useState } from 'react';

const CoordinatorContext = createContext({});

const CoordinatorProvider = ({ children }) => {
    const [ activeMangaId, setActiveMangaId ] = useState();
    const [ volumeList, setVolumeList ] = useState();
    const [ currentVolume, setCurrentVolume ] = useState();
    const [ currentChapterData, setCurrentChapterData ] = useState();
    const [ currentChapterList, setCurrentChapterList ] = useState();
    const [ currentPage, setCurrentPage ] = useState(0);

    const coordState = {
        activeMangaId, setActiveMangaId,
        volumeList, setVolumeList,
        currentVolume, setCurrentVolume,
        currentChapterData, setCurrentChapterData,
        currentChapterList, setCurrentChapterList,
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