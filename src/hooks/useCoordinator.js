import { useContext, useState } from "react";

import AuthContext from "../context/AuthContext";
import CoordinatorContext from '../context/CoordinatorContext';

const useCoordinator = () => {
    const { axiosInstance, mangadexApi} = useContext(AuthContext);
    const { 
        volumeList, setVolumeList, currentVolume, 
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

    const fetchChapters = (activeMangaId, volumeId, setIsLoaded) => {
        axiosInstance.get(mangadexApi + "/chapter?manga=" + activeMangaId + buildChapterQuery(volumeList[volumeId].chapters))
        .then((response) => {
            //force sorting as doubles (decimals get placed last otherwise)
            const list = response.data.results.sort(function(a, b) {
                return Number(a.data.attributes.chapter) - Number(b.data.attributes.chapter);
            });
            setChapterList(list);
            setCurrentChapterList(list);
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
            loadNewChapter(currentChapterList[nextChapterNum], currentVolume);
        } else { //out of bounds for volume, ask for next volume
            const volumeKeys = Object.keys(volumeList);
            const nextVolumeNum = volumeKeys.indexOf(currentVolume) + direction;
            if (nextVolumeNum < volumeKeys.length && nextVolumeNum >= 0) {
                const nextChaptersKeys = Object.keys(volumeList[nextVolumeNum].chapters);
                const firstOrLast = direction > 0 ? 0 : nextChaptersKeys.length - 1;
                const nextChapter = Object.values(volumeList[nextVolumeNum].chapters)[firstOrLast];
                //load new vol and then trigger new fetchchapter for new chapterList, store that as currentChapterList
                console.log(nextChapter);
                // loadNewChapter(nextChapter, nextVolumeNum);

                /*
                fetchVolumes(activeMangaId) << mangalist.L19
                then get first chapter from that.
                only question is how to async chain that process.
                maybe a conditional .finally?
                .finally(() => {
                    if (foo) {
                        then fetchChapters()
                            .finally(() => {
                                if (foo) {
                                    setCurrentChapterData(Objects.values(list)[0]);
                                }
                            })
                    }
                }
                ew! i don't like it! chaining async calls!.. but well, what can you do.
                still fragile too. this whole getNextChapter method sucks ass. myu
                */
            } else {
                alert("No more volumes found!");
            }
        }
    }

    const loadNewChapter = (chapter, volume) => {
        setCurrentChapterData(chapter.data.attributes);
        //dont even worry about setting active chapter or whatever for now
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