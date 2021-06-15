import React, { useContext } from 'react';

import AppContext from '../../context/AppContext';

const Page = ({viewedPage, viewedChapterHash}) => {
    
    
    // const loadPageImage = () => {
    //     console.log("loadPageImage: " + mangadexImg + "/data/" + viewedChapterHash + "/" + viewedPage);
    //     // return <img src={mangadexImg + "/data/" + viewedChapterHash + "/" + viewedPage} />
    // }

    return (
        <div className="page">
            { viewedPage ? loadPageImage() : "cressedexreader" }
        </div>
    )
}

export default Page;