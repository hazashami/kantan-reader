import React from 'react';

const ProgressBar = ({imgSet, viewedChapterHash, currentPage, setCurrentPage}) => {

    const getPieceClass = (entry) => {
        let classes = "progressPiece";
        if (entry == currentPage) {
            classes += " activePiece";
        }
        return classes;
    }

    return (
        <div className="progressBar">
            { imgSet ?
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