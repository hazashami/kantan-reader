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
        axiosInstance.get(mangadexApi + "/manga/" + mangaTitle.data.id + "/aggregate")
        .then((response) => {
            setVolumeList(response.data.volumes);
        })
        .catch((err) => console.error(err.message));
    }

    const fetchChapters = (volumeId) => {
        return axiosInstance.get(mangadexApi + "/chapter?manga=" + activeMangaId + buildChapterQuery(volumeList[volumeId].chapters))
            .then((response) => {
                //force sorting as doubles (decimals get placed last otherwise)
                const list = response.data.results.sort(function(a, b) {
                    return Number(a.data.attributes.chapter) - Number(b.data.attributes.chapter);
                });
                setChapterList(list);
                setCurrentChapterList(list);
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
        if (nextPage < currentChapterData.data.length && nextPage >= 0) {
            setCurrentPage(Number(nextPage));
        } else {
            getNextChapter(direction >= 0 ? 1 : -1)
        }
    }

    const getNextChapter = (direction) => {
        const chaptersKeys = Object.keys(volumeList[currentVolume].chapters);
        const nextChapterNum = chaptersKeys.indexOf(currentChapterData.chapter) + direction;
        if (nextChapterNum < chaptersKeys.length && nextChapterNum >= 0) {
            //doesn't always work. maybe a courtesy check, and if that fails do some trash shit
            setCurrentChapterData(currentChapterList[nextChapterNum].data.attributes);
        } else {
            getNextVolume(direction);
        }
    }

    const getNextVolume = (direction) => {
        const volumeKeys = Object.keys(volumeList);
        const nextVolumeNum = volumeKeys.indexOf(currentVolume) + direction + 1;
        if (nextVolumeNum < volumeKeys.length && nextVolumeNum >= 0) {
            const nextChaptersKeys = Object.keys(volumeList[nextVolumeNum].chapters);
            const firstOrLast = direction > 0 ? 0 : nextChaptersKeys.length - 1;
            const nextChapter = Object.values(volumeList[nextVolumeNum].chapters)[firstOrLast];
            //load new vol and then trigger new fetchchapter for new chapterList, store that as currentChapterList
            console.log(nextChapter);
            console.log("curvol: " + currentVolume + ", nextvol: " + nextVolumeNum + ", nextch: " + nextChapter.chapter + ", at index: " + firstOrLast);

            fetchChapters(nextVolumeNum)
                .finally(() => {
                    console.log('uC fCP finally');
                    console.log(currentChapterList);
                    console.log(currentChapterList[firstOrLast]);
                    if (currentChapterList[firstOrLast]) {
                        setCurrentVolume(nextVolumeNum);
                        setCurrentChapterData(currentChapterList[firstOrLast].data.attributes);
                    }
                });
        } else {
            alert("No more volumes found!");
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