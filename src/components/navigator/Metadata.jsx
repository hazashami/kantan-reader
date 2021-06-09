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
        console.log(setViewedChapterId);
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
        //todo: pagination
        // mangadexHost + "/chapter?manga={id}&limit={limit}&offset={offset * limit}"
        axiosInstance.get(mangadexHost + "/chapter?limit=10&manga=" + id)
        .then((response) => {
            console.log(response);
            setChapterList(response.data.results);
        })
        .catch((err) => console.error(err.message));
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