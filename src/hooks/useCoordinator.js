import { useContext, useState } from "react";

import AuthContext from "../context/AuthContext";
import CoordinatorContext from '../context/CoordinatorContext';

const useCoordinator = () => {
    const { axiosInstance, mangadexApi } = useContext(AuthContext);
    const { 
        activeMangaId,
        volumeList, setVolumeList, currentVolume, setCurrentVolume, 
        currentChapterData, setCurrentChapterData, currentChapterList, setCurrentChapterList,
        currentPage, setCurrentPage 
    } = useContext(CoordinatorContext);

    const [ chapterList, setChapterList ] = useState();

    const fetchVolumes = (mangaTitle) => {
        axiosInstance.get(mangadexApi + "/manga/" + mangaTitle.id + "/aggregate")
        .then((response) => {
            setVolumeList(response.data.volumes);
        })
        .catch((err) => console.error(err.message));
    }

    const fetchChapters = (volumeId) => {
        return axiosInstance.get(mangadexApi + "/chapter?manga=" + activeMangaId + buildChapterQuery(volumeList[volumeId].chapters))
            .then((response) => {
                //force sorting as doubles (decimals get placed last otherwise)
                const list = response.data.data.sort(function(a, b) {
                    return Number(a.attributes.chapter) - Number(b.attributes.chapter);
                });
                setCurrentChapterList(list);
                //stores list for non-active volumes in navigation
                setChapterList(list);
            })
            .catch((err) => console.error(err.message));
    }

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
        if (currentChapterData) {
            const nextPage = currentPage + direction;
            if (nextPage < currentChapterData.data.length && nextPage >= 0) {
                setCurrentPage(Number(nextPage));
            } else {
                getNextChapter(direction >= 0 ? 1 : -1)
            }
        }
    }

    const getNextChapter = (direction) => {
        const nextChapterNum = getNextChapterIndex(direction);
        if (nextChapterNum != -1) {
            setCurrentChapterData(currentChapterList[nextChapterNum].attributes);
        } else {
            alert("reached one end of volume " + currentVolume + ", please select next volume");
        }
    }

    const getNextChapterIndex = (direction) => {
        for (let i = 0; i < currentChapterList.length ; i++) {
            if (currentChapterData.chapter == currentChapterList[i].attributes.chapter) {
                if (i + direction > 0 || i + direction < currentChapterList.length) {
                    return i + direction;
                } else {
                    return -1;
                }
            }
        }
    }

    return {
        fetchVolumes,
        fetchChapters,
        chapterList,
        setChapterList,
        buildChapterQuery,
        getNext,
        getNextChapter,
    }
}

export default useCoordinator;