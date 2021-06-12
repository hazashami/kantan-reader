import React, { useContext, useState } from 'react';

import AppContext from '../../context/AppContext';
import Chapter from './Chapter';

import layout from '../../styles/layout.css';

const Volume = ({activeId, volumeInfo, setViewedChapter}) => {
    const { axiosInstance, mangadexHost } = useContext(AppContext);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ chapterInfo, setChapterInfo ] = useState();

    const renderVolumeInfo = () => {
        return(
            <span className="titleLink" onClick={() => handleVolumeClick()}>
                Volume.{volumeInfo.volume} { isOpen ? 'v' : '>' }
                { isOpen && isLoaded ? renderChapters() : <> </> }
            </span>
        )
    }

    const handleVolumeClick = () => {
        setIsOpen(!isOpen);
        console.log("handleVolumeClick");
        console.log(activeId);
        if (activeId !== '' && chapterInfo === undefined && isLoaded === false) {
            axiosInstance.get(mangadexHost + "/chapter?manga=" + activeId + buildChapterQuery(volumeInfo.chapters))
            .then((response) => {
                setIsLoaded(true);
                setChapterInfo(response.data.results);
            })
            .catch((err) => console.error(err.message));
        }
    }

    const buildChapterQuery = (chapters) => {
        let count = 0;
        let csv = "";
        Object.keys(chapters).map(chapter => {
            csv += "&chapter[]=" + chapters[chapter].chapter;
            count++;
        })
        return csv + "&limit=" + count;
    }

    const renderChapters = () => {
        return( chapterInfo ?
            <div className="chapterContainer">
                {Object.keys(chapterInfo).map(chapter => {
                    return(
                        <Chapter key={"chapter-" + chapterInfo[chapter].data.id} 
                            chapterInfo={chapterInfo[chapter].data} setViewedChapter={setViewedChapter} />
                    )
                })}
            </div>
            : <></>
        )
    }


    return(
        <div className="volume">
            {volumeInfo ? renderVolumeInfo() : <></>}
        </div>
    )
}

export default Volume;