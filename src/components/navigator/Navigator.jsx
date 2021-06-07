import React, { useState } from 'react';

import Metadata from './Metadata';
import Search from './Search';

const Navigator = (bearer) => {
   const [ mangaList, setMangaList ] = useState();

    return (
        <div>
            <Search bearer={bearer} setMangaList={setMangaList} />
            <Metadata mangaList={mangaList} />
        </div>
    )
}

export default Navigator;