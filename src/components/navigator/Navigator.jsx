import React, { useState } from 'react';

import MangaList from './MangaList';
import Search from './Search';

const Navigator = () => {
    const [ mangaList, setMangaList ] = useState([]);
    
    return (
        <div>
            <Search setMangaList={setMangaList} />
            <MangaList mangaList={mangaList} setMangaList={setMangaList} />
        </div>
    )
}

export default Navigator;