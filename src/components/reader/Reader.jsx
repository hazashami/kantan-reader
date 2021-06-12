import React, { useContext, useEffect, useState } from 'react';

import AppContext from '../../context/AppContext';
import Arrow from './Arrow';
import Page from './Page';

const Reader = ({bearer, viewedChapter, viewedChapterHash}) => {
    const { axiosInstance } = useContext(AppContext);
    const [ activePage, setActivePage ] = useState('');

    useEffect(() => {
        setActivePage(viewedChapter[0]);
    }, [viewedChapter]);

    return (
        <div className="reader">
            <Arrow />
            <Page viewedPage={activePage} viewedChapterHash={viewedChapterHash}/>
            <Arrow />
        </div>
    )
}

export default Reader;