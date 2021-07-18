import React, { useContext, useState } from 'react';

import AuthContext from '../../context/AuthContext';
import CoordinatorContext from '../../context/CoordinatorContext';
import useCoordinator from '../../hooks/useCoordinator';
import Chapter from './Chapter';

import layout from '../../styles/layout.css';

const Volume = ({activeMangaId, volumeId}) => {
    const { axiosInstance, mangadexApi} = useContext(AuthContext);
    const { volumeList, chapterList, setChapterList } = useContext(CoordinatorContext);
    const { buildChapterQuery } = useCoordinator();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);

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

    const fetchChapters = (activeMangaId, volumeId) => {
        axiosInstance.get(mangadexApi + "/chapter?manga=" + activeMangaId + buildChapterQuery(volumeList[volumeId].chapters))
        .then((response) => {
            setChapterList(response.data.results);
        })
        .catch((err) => console.error(err.message));
    }

    const handleVolumeClick = () => {
        setIsOpen(!isOpen);
        if (activeMangaId !== '' && chapterList === undefined && isLoaded === false) {
            setChapterList(fetchChapters(activeMangaId, volumeId));
            setIsLoaded(true);
        }
    }

    const renderChapters = () => {
        return( chapterList ?
            <div className="chapterContainer">
                {Object.keys(chapterList).map(chapter => {
                    return(
                        <Chapter key={"chapter-" + chapterList[chapter].data.id} chapterInfo={chapterList[chapter].data} />
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