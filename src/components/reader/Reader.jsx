import React, { useContext, useEffect } from 'react';

import AppContext from '../../context/AppContext';
import Arrow from './Arrow';
import Page from './Page';

const Reader = ({bearer, viewedChapterId}) => {
    const { axiosInstance } = useContext(AppContext);

    useEffect(() => {
        loadChapter();
    }, [viewedChapterId])

    const loadChapter = () => {
        console.log("loadChapter: " + viewedChapterId);
    }

    return (
        <div className="reader">
            <Arrow />
            <Page />
            <Arrow />
        </div>
    )
}

export default Reader;