import React, { useContext } from 'react';

import AppContext from '../../context/AppContext';

const Page = ({viewedPage, viewedChapterHash}) => {
    const { mangadexImgServer } = useContext(AppContext);
    
    const loadPageImage = () => {
        return <img src={mangadexImgServer + "/data/" + viewedChapterHash + "/" + viewedPage} />
    }

    return (
        <div className="page">
            { viewedPage ? loadPageImage() : "cressedexreader" }
        </div>
    )
}

export default Page;