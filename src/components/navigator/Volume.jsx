import React, { useContext, useState } from 'react';

import CoordinatorContext from '../../context/CoordinatorContext';
import useCoordinator from '../../hooks/useCoordinator';
import Chapter from './Chapter';

import layout from '../../styles/layout.css';

const Volume = ({activeMangaId, volumeId}) => {
    const { volumeList } = useContext(CoordinatorContext);
    const { fetchChapters } = useCoordinator();
    const [ chapterList, setChapterList ] = useState();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);

    const handleVolumeClick = () => {
        setIsOpen(!isOpen);
        if (activeMangaId !== '' && isLoaded === false) {
            fetchChapters(activeMangaId, volumeId, setChapterList, setIsLoaded);
        }
    }

    const renderVolumeInfo = () => {
        return(
            <div>
                <span className="titleLink" onClick={() => handleVolumeClick()}>
                    Volume.{volumeList[volumeId].volume} { isOpen ? 'v' : '>' }
                </span>
                { isOpen && isLoaded ? renderChapters() : <> </> }
            </div>
        )
    }

    const renderChapters = () => {
        return( chapterList ?
            <div className="chapterContainer">
                {Object.keys(chapterList).map(chapter => {
                    return(
                        <Chapter key={"chapter-" + chapterList[chapter].data.id} 
                                chapterInfo={chapterList[chapter].data}
                                volumeId={volumeId} />
                    )
                })}
            </div>
            : <></>
        )
    }

    return(
        <div className="volume">
            {volumeList ? renderVolumeInfo() : <></>}
        </div>
    )
}

export default Volume;