import React, { useContext, useState } from 'react';

import AuthContext from '../../context/AuthContext';

import layout from '../../styles/layout.css';

const Search = ({ setMangaList }) => {
    const { axiosInstance, mangadexApi, bearer } = useContext(AuthContext);
    const [ searchStrings, setSearchStrings ] = useState({
        "title": "",
        "status": "ongoing",
        "order": {
            "createdAt": "desc",
            "updatedAt": "desc"
        }
    });

    const handleSearchStrings = (event) => {
        if (event.target instanceof HTMLInputElement) {
            setSearchStrings({...searchStrings, [event.target.name]: event.target.value});
        }
    }

    const getInputs = () => {
        return (
            <div className="params">
                <input className="titleSearch" name="title" type="text" placeholder="title..." onChange={handleSearchStrings} autoFocus="autofocus" />
            </div>
        )
    }

    const submitSearch = (event) => {
        //todo: put this on an interceptor
        event.preventDefault();
        axiosInstance.get(mangadexApi + "/manga?title=" + searchStrings.title + "&limit=10")
        .then((response) => {
            setMangaList(response.data.data);
        })
        .catch((err) => console.error(err.message));
    }

    return(
        <form className="search">
            {getInputs()}
            <button className="searchButton" onClick={submitSearch}>search</button>
        </form>
    )
}

export default Search;