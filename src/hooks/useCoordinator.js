import { useContext } from "react";

import CoordinatorContext from '../context/CoordinatorContext';

const useCoordinator = () => {
    const { viewedChapter, currentPage, setCurrentPage } = useContext(CoordinatorContext);

    const buildChapterQuery = (chapters) => {
        let count = 0;
        let csv = "";
        Object.keys(chapters).map(chapter => {
            csv += "&chapter[]=" + chapters[chapter].chapter;
            count++;
        })
        return csv + "&translatedLanguage[]=en&limit=" + count;
    }

    const getNext = (direction) => {
        const nextPage = currentPage + direction;
        if (nextPage < viewedChapter.length && nextPage >= 0) {
            setCurrentPage(Number(nextPage));
        } else {
            getNextChapter(direction >= 0 ? 1 : -1)
        }
    }

    const getNextChapter = (direction) => {
        console.log("getNextChapter " + direction);
    }

    return {
        buildChapterQuery,
        getNext,
        getNextChapter,
    }
}

export default useCoordinator;