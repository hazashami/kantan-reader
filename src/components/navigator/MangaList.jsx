import React, { useContext, useState } from 'react';

import AuthContext from '../../context/AuthContext';
import Volume from './Volume';

import layout from '../../styles/layout.css';

const MangaList = ({mangaList, setViewedChapter, setViewedChapterHash}) => {
    const { axiosInstance, mangadexApi } = useContext(AuthContext);
    const [ aggregate, setAggregate ] = useState();
    //todo: figure out a cleaner way to manage this. the one:many situation is too much for my brain right now
    const [ activeTitleId, setActiveTitleId ] = useState();

    const renderList = () => {
        return(
            Object.keys(mangaList).map(entry => {
                return(
                    <span className="titleLink" key={mangaList[entry].data.id} 
                            onClick={() => handleTitleClick(mangaList[entry].data.id)}>
                        {mangaList[entry].data.attributes.title.en}
                        { aggregate && activeTitleId === mangaList[entry].data.id ?
                            renderVolumes()
                            : <> </>
                        }
                    </span>
                )
            })
        );
    }

    //todo: need isOpen for active volumes
    const handleTitleClick = (id) => {
        axiosInstance.get(mangadexApi + "/manga/" + id + "/aggregate")
        .then((response) => {
            setAggregate(response.data.volumes);
            setActiveTitleId(id);
        })
        .catch((err) => console.error(err.message));
    }
    
    const renderVolumes = () => {
        return(
            Object.keys(aggregate).map(volume => {
                return(
                    <Volume key={"volume" + aggregate[volume].volume} activeId={activeTitleId} volumeInfo={aggregate[volume]} 
                    setViewedChapter={setViewedChapter} setViewedChapterHash={setViewedChapterHash} />
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