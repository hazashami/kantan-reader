import { useContext } from "react";

import AuthContext from "../context/AuthContext";
import CoordinatorContext from '../context/CoordinatorContext';

const useCoordinator = () => {
    const { axiosInstance, mangadexApi} = useContext(AuthContext);
    const { volumeList, currentVolume, currentChapter, currentChapterFiles, currentPage, setCurrentPage } = useContext(CoordinatorContext);

    const fetchVolumes = (mangaTitle, setMangaList, setActiveMangaId, setVolumeList) => {
        axiosInstance.get(mangadexApi + "/manga/" + mangaTitle.data.id + "/aggregate")
        .then((response) => {
            setMangaList([mangaTitle]);
            setActiveMangaId(mangaTitle.data.id);
            setVolumeList(response.data.volumes);
        })
        .catch((err) => console.error(err.message));
    }

    const fetchChapters = (activeMangaId, volumeId, setChapterList, setIsLoaded) => {
        axiosInstance.get(mangadexApi + "/chapter?manga=" + activeMangaId + buildChapterQuery(volumeList[volumeId].chapters))
        .then((response) => {
            //force sorting as doubles (decimals get placed last otherwise)
            setChapterList(response.data.results.sort(function(a, b) {
                return Number(a.data.attributes.chapter) - Number(b.data.attributes.chapter);
            }));
            setIsLoaded(true);
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
        console.log(csv);
        return csv + "&translatedLanguage[]=en&limit=" + count;
    }

    const getNext = (direction) => {
        const nextPage = currentPage + direction;
        if (nextPage < currentChapterFiles.length && nextPage >= 0) {
            setCurrentPage(Number(nextPage));
        } else {
            getNextChapter(direction >= 0 ? 1 : -1)
        }
    }

    const getNextChapter = (direction) => {
        const chapterKeys = Object.keys(volumeList[currentVolume].chapters);
        const nextChapter = chapterKeys.indexOf(currentChapter) + direction;
        if (nextChapter < chapterKeys.length && nextChapter >= 0) {
            console.log(chapterKeys);
            console.log(chapterKeys[nextChapter]);
        } else { //out of bounds for volume, ask for next volume
            const volumeKeys = Object.keys(volumeList);
            const nextVolume = volumeKeys.indexOf(currentVolume) + direction;
            if (nextVolume < volumeKeys.length && nextVolume >= 0) {
                console.log("getting first chapter in volume");
                console.log(Object.values(volumeList[nextVolume].chapters)[0]);
            } else { //no more volumes in that direction
                console.log("couldn't get next volume");
            }
        }
    }

    return {
        fetchVolumes,
        fetchChapters,
        buildChapterQuery,
        getNext,
        getNextChapter,
    }
}

export default useCoordinator;