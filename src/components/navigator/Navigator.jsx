import React, { useState } from 'react';

import MangaList from './MangaList';
import Search from './Search';

const Navigator = ({ bearer, setViewedChapter, setViewedChapterHash }) => {
    const [ mangaList, setMangaList ] = useState([]);
    
    return (
        <div>
            <Search bearer={bearer} setMangaList={setMangaList} />
            <MangaList mangaList={mangaList} setViewedChapter={setViewedChapter} setViewedChapterHash={setViewedChapterHash} />
        </div>
    )
}

export default Navigator;