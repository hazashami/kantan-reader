import React from 'react';

import Metadata from './Metadata';
import Search from './Search';

const Navigator = (bearer) => {
    /*
    /manga
    limit and offset
    title
    */

    return (
        <div>
            <Search bearer={bearer} />
            <Metadata />
        </div>
    )
}

export default Navigator;