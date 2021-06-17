import React, { useState } from 'react';

import MangaList from './MangaList';
import Search from './Search';

const Navigator = ({ setViewedChapter, setViewedChapterHash }) => {
    const [ mangaList, setMangaList ] = useState([]);
    
    return (
        <div>
            <Search setMangaList={setMangaList} />
            <MangaList mangaList={mangaList} setMangaList={setMangaList} setViewedChapter={setViewedChapter} setViewedChapterHash={setViewedChapterHash} />
        </div>
    )
}

export default Navigator;