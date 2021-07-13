import React, { useContext } from 'react';

import AppContext from '../../context/AppContext';

const ProgressBar = ({imgSet, currentPage, setCurrentPage}) => {
    const { viewedChapterHash } = useContext(AppContext);

    const getPieceClass = (entry) => {
        let classes = "progressPiece";
        if (entry == currentPage) {
            classes += " activePiece";
        }
        return classes;
    }

    return (
        <div className="progressBar">
            { viewedChapterHash && imgSet ?
                Object.keys(imgSet).map((entry) => {
                    return(
                        <div key={viewedChapterHash + '-' + entry} className={getPieceClass(entry)} 
                            style={{width: (100 / imgSet.length) + "%"}} onClick={() => setCurrentPage(Number(entry))}/>
                    )
                })
                : <> </>
            }
        </div>
    )
}

export default ProgressBar;