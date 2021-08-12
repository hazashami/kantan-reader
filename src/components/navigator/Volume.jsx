import React, { useContext, useState } from 'react';

import CoordinatorContext from '../../context/CoordinatorContext';
import useCoordinator from '../../hooks/useCoordinator';
import Chapter from './Chapter';

import layout from '../../styles/layout.css';

const Volume = ({volumeId}) => {
    const { activeMangaId, volumeList } = useContext(CoordinatorContext);
    const { fetchChapters, chapterList } = useCoordinator();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);

    const handleVolumeClick = () => {
        setIsOpen(!isOpen);
        if (activeMangaId !== '' && isLoaded === false) {
            fetchChapters(volumeId)
                .finally(() => {
                    setIsLoaded(true);
                });
        }
    }

    const renderVolumeInfo = () => {
        let volTitle = "Volume." + volumeList[volumeId].volume;
        if (volTitle === "Volume.none") {
            volTitle = "Latest Chapters";
        }
        return(
            <div>
                <span className="titleLink" onClick={() => handleVolumeClick()}>
                    {volTitle} { isOpen ? 'v' : '>' }
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
                        <Chapter key={"chapter-" + chapterList[chapter].data.id} chapterInfo={chapterList[chapter].data} volumeId={volumeId} />
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