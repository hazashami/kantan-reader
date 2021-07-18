import React, { useContext, useState } from 'react';

import CoordinatorContext from '../../context/CoordinatorContext';
import useCoordinator from '../../hooks/useCoordinator';
import Volume from './Volume';

import layout from '../../styles/layout.css';

const MangaList = ({mangaList, setMangaList}) => {
    const { volumeList, setVolumeList } = useContext(CoordinatorContext);
    const { fetchVolumes } = useCoordinator();
    const [ activeMangaId, setActiveMangaId ] = useState();

    const renderList = () => {
        return(
            Object.keys(mangaList).map(entry => {
                return(
                    <span className="titleLink" key={mangaList[entry].data.id} 
                            onClick={() => handleTitleClick(mangaList[entry])}>
                        {mangaList[entry].data.attributes.title.en}
                        { volumeList && activeMangaId === mangaList[entry].data.id ?
                            renderVolumes()
                            : <> </>
                        }
                    </span>
                )
            })
        );
    }

    const handleTitleClick = (mangaTitle) => {
        fetchVolumes(mangaTitle, setMangaList, setActiveMangaId, setVolumeList);
    }
    
    const renderVolumes = () => {
        return(
            Object.keys(volumeList).map(volume => {
                return(
                    <Volume key={"volume" + volumeList[volume].volume} activeMangaId={activeMangaId} volumeId={volume}/>
                );
            })
        )
    }

    return (
        <div className="mangaList">
            {mangaList.length > 0 ? renderList() : <></>}
        </div>
    )
}

export default MangaList;