import React, { createContext, useState } from 'react';

const AppContext = createContext({
    chapterHash: '',
    chapterLinks: [],
    updateChapterHash: () => {},
    updateChapterLinks: () => {}
});

const AppProvider = ({ children }) => {
    const [ chapterHash, setChapterHash ] = useState('');
    const [ chapterLinks, setChapterLinks ] = useState([]);

    const updateChapterHash = (hash) => {
        setChapterHash(hash);
    }

    const updateChapterLinks = (urls) => {
        setChapterLinks(urls);
    }

    return(
        <AppContext.Provider value={{ chapterHash, chapterLinks, updateChapterHash, updateChapterLinks }} >
            { children }
        </AppContext.Provider>
    )
}

export default AppContext;
export { AppProvider };