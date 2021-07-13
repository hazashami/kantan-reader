import React, { createContext, useState } from 'react';

const AppContext = createContext({
    viewedChapterHash: '',
    viewedChapter: [],
    setViewedChapterHash: () => {},
    setViewedChapter: () => {}
});

const AppProvider = ({ children }) => {
    const [ viewedChapterHash, setViewedChapterHash ] = useState('');
    const [ viewedChapter, setViewedChapter ] = useState([]);

    return(
        <AppContext.Provider value={{ viewedChapterHash, viewedChapter, setViewedChapter, setViewedChapterHash }} >
            { children }
        </AppContext.Provider>
    )
}

export default AppContext;
export { AppProvider };