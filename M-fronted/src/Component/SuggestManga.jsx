import React, { useEffect, useState, useContext } from 'react'
import MangaContex from './MangaContex.jsx'
import { MangaCon } from "../Context/MangaContex.jsx";
import axios from "axios";
import PaginationPage from './PaginationPage.jsx'

const SuggestManga = ({ genres, mangaId }) => {

    const [recommendations, setRecommendations] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)

    const { backendUrl, isFavorite, setClicked } = useContext(MangaCon)

    const getRecommendations = async () => {
        try {
            const response = await axios.get(
                backendUrl + "/api/manga/mangaInfo",
                {
                    params: {
                        category: genres.join(","),
                        page,
                        limit: 6
                    }
                }
            )

            if (response.data.success) {
                setRecommendations(response.data.pageInfo)
                setTotalPage(response.data.totalPages)
                setTotal(response.data.total)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (genres && genres.length > 0) {
            getRecommendations()
        }
    }, [genres, page, mangaId])

    return (
        <div className="w-full mt-4 px-4 sm:px-6">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
                <div>
                    <span className="block text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#b98bff] uppercase mb-0.5">
                        Picked for you
                    </span>
                    <h2
                        className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight"
                        style={{ textShadow: '0 0 14px rgba(185,139,255,0.35)' }}
                    >
                        Recommended Manga
                    </h2>
                    <p className="text-xs sm:text-sm text-[#8a7a9c] mt-1.5">
                        Based on similar genres you may like
                    </p>
                </div>

                {recommendations?.length > 0 && (
                    <span className="w-fit flex items-center justify-center px-4 py-1.5 rounded-full bg-[#1a0f26] border border-[#3d2456] text-[#c9bcdb] text-xs font-semibold">
                        {total} Results
                    </span>
                )}
            </div>

            {recommendations?.length === 0 ? (
                <div className="mx-4 sm:mx-0 rounded-2xl border border-dashed border-[#3d2456] bg-[#0f0a14] py-14 px-6 text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                        No Recommendations Found
                    </h3>
                    <p className="text-[#8a7a9c] mt-2.5 text-sm max-w-lg mx-auto leading-relaxed">
                        Try exploring more manga genres to get better recommendations.
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                        {recommendations?.map((recommendation) => (
                            <MangaContex
                                key={recommendation._id}
                                name={recommendation?.manga.name}
                                chapter1={recommendation.latestChapters[0].chapterNo}
                                chapter2={recommendation?.latestChapters[1]?.chapterNo}
                                coverImg={recommendation?.manga.coverImg}
                                id={recommendation.manga._id}
                                isFavorite={isFavorite}
                                setClicked={setClicked}
                                onclick={mangaId = recommendation._id}
                                createdAt1={recommendation.latestChapters[0].createdAt}
                                createdAt2={recommendation?.latestChapters[1]?.createdAt}
                            />
                        ))}
                    </div>

                    <div className="w-full flex items-center justify-center pt-1">
                        <PaginationPage
                            page={page}
                            onChange={setPage}
                            totalPage={totalPage}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default SuggestManga