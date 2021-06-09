import React, { useState } from 'react';

import Metadata from './Metadata';
import Search from './Search';

const Navigator = ({ bearer, setViewedChapterId }) => {
    const [ mangaList, setMangaList ] = useState([]);
    
    return (
        <div>
            <Search bearer={bearer} setMangaList={setMangaList} />
            <Metadata mangaList={mangaList} setViewedChapterId={setViewedChapterId} />
        </div>
    )
}

export default Navigator;