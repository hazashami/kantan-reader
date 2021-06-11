import React, { useState } from 'react';

import MangaList from './MangaList';
import Search from './Search';

const Navigator = ({ bearer, setViewedChapterId }) => {
    const [ mangaList, setMangaList ] = useState([]);
    
    return (
        <div>
            <Search bearer={bearer} setMangaList={setMangaList} />
            <MangaList mangaList={mangaList} setViewedChapterId={setViewedChapterId} />
        </div>
    )
}

export default Navigator;