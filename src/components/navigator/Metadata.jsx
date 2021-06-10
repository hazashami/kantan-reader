import React, { useContext, useEffect, useState } from 'react';

import AppContext from '../../context/AppContext';

import layout from '../../styles/layout.css';

const Metadata = ({ mangaList, setViewedChapterId }) => {
    const { axiosInstance, mangadexHost } = useContext(AppContext);
    const [ chapterList, setChapterList ] = useState([]);

    useEffect(() => {
        renderList();
    }, [mangaList]);

    const renderList = () => {
        return(
            Object.keys(mangaList).map(entry => {
                return <a className="titleLink" key={mangaList[entry].data.id} href="#"
                        onClick={() => handleTitleClick(mangaList[entry].data.id)}>{mangaList[entry].data.attributes.title.en}</a>
            })
        );
    }

    //probably need to visit /manga/{id}/aggregate to get volumes list first
    /*
        get manga/{id}/aggregate
        response.data = {
            volumes {
                1 : {
                    count: 21,
                    chapters: {
                        1: {
                            chapter: 1
                            count: 1 <- ?
                        }
                    }
                }
                ...
                N/A: {
                    count: 6,
                    chapters: {
                        70: {
                            chapter: 70
                            count: 1
                        }
                    }
                }
            }
        }

        go backwards thru this ordered object, starting with N/A. 
            build csv of chapter strings and go all the way thru until <limit>
            use /chapter?manga={id}&chapter[]={chapterCSV}&limit={limit}
        not too bad
    */
    const renderChapters = () => {
        return(
            Object.keys(chapterList).map(entry => {
                return( 
                    <a className="chapterLink" key={chapterList[entry].data.id} href="#"
                            onClick={() => setViewedChapterId(chapterList[entry].data.id)}>
                        {buildChapterString(chapterList[entry])}
                    </a>
                );
            })
        );
    }

    const buildChapterString = (chapter) => {
        const vol = "vol" + chapter.data.attributes.volume;
        const ch = "ch" + chapter.data.attributes.chapter;
        const title = chapter.data.attributes.title;
        const lang = '(' + chapter.data.attributes.translatedLanguage + ')';
        return vol + ch + ": " + title + " " + lang;
    }

    const handleTitleClick = (id) => {
        axiosInstance.get(mangadexHost + "/manga/" + id + "/aggregate")
        .then((response) => {
            //good to hold onto this perhaps. why not grab all volumes. just have carats tos how chapters
            const chapterCSV = processAggregateList(response.data.volumes);
            console.log(chapterCSV);
            axiosInstance.get(mangadexHost + "/chapter?&manga=" + id + chapterCSV + "&limit=50")
            .then((response) => {
                console.log(response.data);
            })
        })
    }

    const processAggregateList = (volumes) => {
        let limit = 50;
        let chapterCSV = "";
        const volumesList = Object.keys(volumes);
        sortDescending(volumesList);
        for (const volume of volumesList) {
            //todo: update this var name. ew
            const chList = Object.keys(volumes[volume].chapters);
            sortDescending(chList);
            console.log("chList");
            console.log(chList);
            for (const ch of chList) {
                if (--limit <= 0) {
                    break;
                }
                chapterCSV += "&chapter[]=" + volumes[volume].chapters[ch].chapter
            }
        }
        console.log(limit);
        return chapterCSV.slice(0, chapterCSV.length - 1);
    }

    const sortDescending = (array) => {
        array.sort(function(a, b) {
            if (a === "N/A") return -1;
            if (b === "N/A") return -1;
            return parseInt(b) - parseInt(a);
        })
    }

    //todo: one of the following
    //chapterList as child of mangaList title
    //or mangaList reduced to one after chapterList selected < this is easier, let's do this
    return (
        <div className="metadata">
            <div className="mangaList">
                {mangaList.length > 0 ? renderList() : <> </>}
            </div>
            <div className="chapterList">
                {chapterList.length > 0 ? renderChapters() : <> </>}
            </div>
        </div>
    )
}

export default Metadata;