import React, { useContext, useState } from 'react';

import AppContext from '../../context/AppContext';
import Chapter from './Chapter';

import layout from '../../styles/layout.css';

const Volume = ({activeId, volumeInfo, setViewedChapterId}) => {
    const { axiosInstance, mangadexHost } = useContext(AppContext);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ chapterLinks, setChapterLinks ] = useState([]); 
    // chapterId: <1, 2, 70, 70.1, etc>, 
    // chapterLink
    // chapterName
    // chapterLang

    const renderVolumeInfo = () => {
        return(
            <span className="titleLink" onClick={() => handleVolumeClick()}>
                Volume.{volumeInfo.volume} { isOpen ? 'V' : '>' }
                { isOpen ? renderChapters() : <> </> }
            </span>
        )
    }

    const handleVolumeClick = () => {
        console.log("handleVolumeclick");
        console.log(volumeInfo);
        setIsOpen(!isOpen);
        if (activeId !== '' && chapterLinks !== undefined && isLoaded === false) {
            let api = mangadexHost + "/chapter?manga=" + activeId + buildChapterCSV(volumeInfo.chapters);
            console.log(api);
            axiosInstance.get(api)
            .then((response) => {
                console.log(response.data);
                setIsLoaded(true);
                //chapterLinks
            })
            .catch((err) => console.error(err.message));
        }
    }

    const buildChapterCSV = (chapters) => {
        let csv = "";
        Object.keys(chapters).map(chapter => {
            csv += "&chapter[]=" + chapters[chapter].chapter
        })
        return csv;
    }

    const renderChapters = () => {
        return(
            Object.keys(volumeInfo.chapters).map(chapter => {
                return(
                    <Chapter key={"chapter" + volumeInfo.chapters[chapter]} chapterInfo={chapter} setViewedChapterId={setViewedChapterId} />
                )
            })
        )
    }


    return(
        <div className="volume">
            {volumeInfo ? renderVolumeInfo() : <></>}
        </div>
    )
}

export default Volume;