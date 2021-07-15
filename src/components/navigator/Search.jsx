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
                <input name="title" type="text" placeholder="title..." onChange={handleSearchStrings} autoFocus="autofocus" />
            </div>
        )
    }

    const buildSearch = () => {
        let queryParams = "?title=" + searchStrings.title + "&limit=10";
        return queryParams;
    }

    const submitSearch = (event) => {
        //todo: put this on an interceptor
        event.preventDefault();
        const auth = {
            headers: { Authorization: `Bearer ${bearer}`}
        }
        axiosInstance.get(mangadexApi + "/manga" + buildSearch(), auth)
        .then((response) => {
            setMangaList(response.data.results);
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