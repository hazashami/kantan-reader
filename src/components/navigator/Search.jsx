import React, { useContext, useState } from 'react';

import AuthContext from '../../context/AuthContext';

import layout from '../../styles/layout.css';

const Search = ({ setMangaList }) => {
    const { axiosInstance, mangadexApi, bearer } = useContext(AuthContext);

    const [ isAdvanced, setIsAdvanced ] = useState(false);
    const [ searchStrings, setSearchStrings ] = useState({
        "title": "",
        "status": "ongoing",
        "order": {
            "createdAt": "desc",
            "updatedAt": "desc"
        }
    });
    const [ searchArrays, setSearchArrays ] = useState({
        "authors": [],
        "includedTags": [],
        "excludedTags": [],
    });
    const [ searchPage, setSearchPage ] = useState({
        "limit": 0,
        "offset": 0
    });

    const handleSearchStrings = (event) => {
        if (event.target instanceof HTMLInputElement) {
            setSearchStrings({...searchStrings, [event.target.name]: event.target.value});
        }
    }

    const handleSearchArrays = (event) => {
        if (event.target instanceof HTMLInputElement) {
            setSearchArrays({...searchArrays, [event.target.name]: event.target.value});
        }
    }

    const handleSearchPage = (event) => {
        if (event.target instanceof HTMLInputElement) {
            setSearchPage({...searchPage, [event.target.name]: event.target.value});
        }
    }

    const getInputs = () => {
        return (
            <div className="params">
                <input name="title" type="text" placeholder="title" onChange={handleSearchStrings} autoFocus="autofocus" />
                {/* {isAdvanced ? 
                    <div className="advancedParams">
                        <select name="status" placeholder="status" type="dropdown" onChange={handleSearchStrings}>
                            <option value="ongoing">ongoing</option>
                            <option value="completed">completed</option>
                            <option value="hiatus">hiatus</option>
                            <option value="cancelled">cancelled</option>
                        </select>
                        {Object.keys(searchArrays).map(key => {
                            return (
                                <input key={key} name={key} type="text" placeholder={key + ", csv"} onChange={handleSearchArrays} />
                            )
                        })}
                    </div>
                    : <> </>
                } */}
            </div>
        )
    }

    const handleCheckboxChange = () => {
        setIsAdvanced(!isAdvanced);
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
            {/* <div>
                <input type="checkbox" name="advanced" value={isAdvanced} onChange={handleCheckboxChange}/>
                <label>Advanced Search</label>
            </div> */}
            {getInputs()}
            <button className="searchButton" onClick={submitSearch}>search</button>
        </form>
    )
}

export default Search;