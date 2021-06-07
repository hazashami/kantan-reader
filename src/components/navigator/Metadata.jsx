import React, { useContext, useEffect, useState } from 'react';

import AppContext from '../../context/AppContext';

import layout from '../../styles/layout.css';

const Metadata = (mangaList) => {
    const { axiosInstance, mangadexHost } = useContext(AppContext);
    const [ readableList, setReadableList ] = useState([{}]);

    useEffect(() => {
        buildList();
    }, [mangaList]);

    const buildList = () => {
        //todo: fix the nested object
        if (mangaList && mangaList.mangaList && mangaList.mangaList.length > 0) {
            Object.keys(mangaList.mangaList).map(mangaTitle => {
                console.log(mangaList.mangaList[mangaTitle]);
                setReadableList(readableList => [...readableList, {"title": mangaList.mangaList[mangaTitle].data.attributes.title.en, "id": mangaList.mangaList[mangaTitle].data.id}]);
            });
        }
    }

    const renderList = () => {
        return(
            Object.keys(readableList).map(entry => {
                return <div className="titleLink" key={readableList[entry].title} onClick={handleLink(readableList[entry].id)}>{readableList[entry].title}</div>
            })
        );
    }

    const handleLink = (id) => {
        console.log("handleLink");
        console.log(id);
    }

    return (
        <div className="metadata">
            {readableList.length > 0 ? renderList() : <> </>}
        </div>
    )
}

export default Metadata;