import React, { useContext, useState } from 'react';

import AuthContext from '../../context/AuthContext';
import Volume from './Volume';

import layout from '../../styles/layout.css';

const MangaList = ({mangaList, setMangaList, setViewedChapter, setViewedChapterHash}) => {
    const { axiosInstance, mangadexApi } = useContext(AuthContext);
    const [ aggregate, setAggregate ] = useState();
    //todo: figure out a cleaner way to manage this. the one:many situation is too much for my brain right now
    const [ activeTitleId, setActiveTitleId ] = useState();

    const renderList = () => {
        return(
            Object.keys(mangaList).map(entry => {
                return(
                    <span className="titleLink" key={mangaList[entry].data.id} 
                            onClick={() => handleTitleClick(mangaList[entry])}>
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
    const handleTitleClick = (mangaTitle) => {
        axiosInstance.get(mangadexApi + "/manga/" + mangaTitle.data.id + "/aggregate")
        .then((response) => {
            setMangaList([mangaTitle]);
            setAggregate(response.data.volumes);
            setActiveTitleId(mangaTitle.data.id);
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