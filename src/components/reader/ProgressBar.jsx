import React, { useContext } from 'react';

import CoordinatorContext from '../../context/CoordinatorContext';

const ProgressBar = ({imgSet, currentPage, setCurrentPage}) => {
    const { viewedChapterHash } = useContext(CoordinatorContext);

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