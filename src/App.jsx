import React from 'react';
import { hot } from 'react-hot-loader/root';

import Arrow from './components/Arrow';

const App = () => {
    const title = "now with hotloading";

    return (
        <div>
            {title}
            <Arrow />
        </div>
        
    )
}

export default hot(App);