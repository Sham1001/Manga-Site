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
                        genres: genres.join(","),
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

        <div className="w-full mt-12 px-3 sm:px-5 lg:px-8">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

                <div>

                    <h2
                        className="
                            text-2xl
                            sm:text-3xl
                            lg:text-4xl
                            font-bold
                            text-gray-900
                            tracking-tight
                        "
                    >
                        Recommended Manga
                    </h2>

                    <p
                        className="
                            text-sm
                            sm:text-base
                            text-gray-500
                            mt-2
                        "
                    >
                        Based on similar genres you may like
                    </p>

                </div>

                {
                    recommendations?.length > 0 && (

                        <span
                            className="
                                w-fit
                                flex
                                items-center
                                justify-center
                                px-4
                                py-2
                                rounded-full
                                bg-black
                                text-white
                                text-sm
                                font-medium
                                shadow-md
                            "
                        >
                            {total} Results
                        </span>

                    )
                }

            </div>

            {
                recommendations?.length === 0 ? (

                    <div
                        className="
                            w-full
                            min-h-[280px]
                            flex
                            flex-col
                            items-center
                            justify-center
                            border
                            border-dashed
                            border-gray-300
                            rounded-3xl
                            bg-gradient-to-b
                            from-gray-50
                            to-white
                            px-6
                            text-center
                        "
                    >

                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">
                            No Recommendations Found
                        </h3>

                        <p
                            className="
                                text-gray-500
                                mt-3
                                text-sm
                                sm:text-base
                                max-w-lg
                                leading-relaxed
                            "
                        >
                            Try exploring more manga genres to get better recommendations.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-10">

                        <div
                            className="
                                grid
                                grid-cols-2
                                sm:grid-cols-2
                                md:grid-cols-3
                                lg:grid-cols-5
                                xl:grid-cols-6
                                gap-4
                                sm:gap-6
                            "
                        >

                            {
                                recommendations?.map((recommendation) => (

                                    <div
                                        key={recommendation._id}
                                        className="
                                            group
                                            transform
                                            transition-all
                                            duration-300
                                            hover:-translate-y-1
                                        "
                                    >

                                        <div
                                            className="
                                                h-full
                                                rounded-2xl
                                                overflow-hidden
                                                bg-white
                                                shadow-sm
                                                hover:shadow-2xl
                                                transition-all
                                                duration-300
                                            "
                                        >

                                            <MangaContex
                                                name={recommendation?.manga.name}
                                                // chapters={recommendation.chapterNo}
                                                 chapter1={recommendation.latestChapters[0].chapterNo}
                                                 chapter2={recommendation?.latestChapters[1]?.chapterNo}
                                                coverImg={recommendation?.manga.coverImg}
                                                id={recommendation.manga._id}
                                                isFavorite={isFavorite}
                                                setClicked={setClicked}
                                                onclick={mangaId = recommendation._id}
                                                // createdAt={recommendation.createdAt}
                                                createdAt1={recommendation.latestChapters[0].createdAt}
                                                createdAt2={recommendation?.latestChapters[1]?.createdAt}
                                            />

                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                        <div
                            className="
                                w-full
                                flex
                                items-center
                                justify-center
                                pt-2
                            "
                        >
                            <PaginationPage
                                page={page}
                                onChange={setPage}
                                totalPage={totalPage}
                            />
                        </div>

                    </div>

                )
            }

        </div>
    )
}

export default SuggestManga