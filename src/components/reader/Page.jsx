import React, { useContext } from 'react';

import AppContext from '../../context/AppContext';

const Page = ({viewedPage, viewedChapterHash}) => {
    //todo: replace or pojo-ify

    return (
        <div className="page">
            { viewedPage ? loadPageImage() : "cressedexreader" }
        </div>
    )
}

export default Page;