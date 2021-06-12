import React, { useState } from 'react';

import MangaList from './MangaList';
import Search from './Search';

const Navigator = ({ bearer, setViewedChapter }) => {
    const [ mangaList, setMangaList ] = useState([]);
    
    return (
        <div>
            <Search bearer={bearer} setMangaList={setMangaList} />
            <MangaList mangaList={mangaList} setViewedChapter={setViewedChapter} />
        </div>
    )
}

export default Navigator;