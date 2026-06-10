import mangaModel from "../models/mangaModel.js";
import chapterModel from '../models/chapterModel.js'
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import { group } from "console";
import { lookup } from "dns";
import { format } from "path";
import mongoose from "mongoose";
// import { promises } from "dns";


const addManga = async (req, res) => {
    const { name, authName, description, date, genres, subGenres, popular, complete, type, recommended, artistName } = req.body
    const image = req.file?.path

    try {
        if (!name) {
            return res.status(400).json({ success: false, message: "Name is missing" })
        }

        if (!authName) {
            return res.status(400).json({ success: false, message: "Author Name is missing" })
        }
        if (!artistName) {
            return res.status(400).json({ success: false, message: "Artist Name is missing" })
        }

        if (!description) {
            return res.status(400).json({ success: false, message: "Description is missing" })
        }

        if (!date) {
            return res.status(400).json({ success: false, message: "Date is missing" })
        }

        if (!genres) {
            return res.status(400).json({ success: false, message: "Genres is missing" })
        }

        if (popular === undefined) {
            return res.status(400).json({ success: false, message: "Popular is missing" })
        }

        if (complete === undefined) {
            return res.status(400).json({ success: false, message: "Ongoing is missing" })
        }

        if (!type) {
            return res.status(400).json({ success: false, message: "Type is missing" })
        }

        if (!image) {
            return res.status(400).json({ success: false, message: "CoverImg is missing" })
        }


        const result = await cloudinary.uploader.upload(image, { folder: "manga", use_filename: true, unique_filename: true })

        await fs.promises.unlink(image);


        const manga = new mangaModel({
            name,
            artistName,
            authorName: authName,
            description,
            date,
            genres,
            subGenres,
            popular,
            ongoing: complete,
            type,
            Recommended: recommended,
            coverImg: result.secure_url
        })

        await manga.save()

        return res.status(200).json({ success: true, message: "Manga added successfully" })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}


const getMangaInfo = async (req, res) => {
    try {

        const genres = req.query.genres
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 12
        const sort = req.query.sort || "latest"
        const search = req.query.search || "";
        const category = req?.query?.category
        const subCategory = req?.query?.subCategory
        const admin = req.query.admin
        const skip = (page - 1) * limit

        const query = {}

        if (admin) {
            console.log(search, "This is search in admin")
            if (search) {
                query.name = {
                    $regex: search, $options: "i"
                }
            }
        }

        if (admin) {
            const mangas = await mangaModel.aggregate([
                {
                    $lookup: {
                        from: "chapters",
                        localField: "_id",
                        foreignField: "managaId",
                        as: "chapters"
                    }
                },


                {
                    $addFields: {
                        latestChapter: {
                            $slice: [
                                { $sortArray: { input: "$chapters", sortBy: { createdAt: -1 } } },
                                2
                            ]
                        }
                    }
                },

                {
                    $addFields: {
                        latestChapterNo: "$latestChapter.chapterNo",
                        latestChapterDate: "$latestChapter.createdAt"
                    }
                },

                {
                    $match: query
                },

                {
                    $facet: {
                        data: [
                            { $sort: { createdAt: -1 } },
                            { $skip: skip },
                            { $limit: limit }
                        ],

                        totalCount: [
                            {
                                $count: "count"
                            }
                        ]
                    }
                }
            ])

            const result = mangas[0];

            const pageInfo = result.data;

            // if (pageInfo) {
            //     console.log(pageInfo,"This is page infohohoho")
            // }

            const total = result.totalCount[0]?.count || 0;

            const totalPages = Math.ceil(total / limit);

            return res.status(200).json({ success: true, pageInfo, total, totalPages })
        }




        if (search) {

            query["manga.name"] = {
                $regex: search, $options: "i"
            }
        }



        if (sort === "popular") {


            try {
                const popularManga = await chapterModel.aggregate([

                    {
                        $sort: {
                            createdAt: -1
                        }
                    },

                    {
                        $group: {
                            _id: "$managaId",
                            latestChapters: {
                                $firstN: {
                                    input: "$$ROOT",
                                    n: 2
                                }
                            }
                        }
                    },


                    {
                        $lookup: {
                            from: "mangas",
                            localField: "_id",
                            foreignField: "_id",
                            as: "manga"
                        }
                    },

                    {
                        $unwind: "$manga"
                    },

                    {
                        $match: {
                            "manga.popular": true
                        }
                    }

                ])

                if (!popularManga) {
                    return res.status(500).json({ success: false, message: "Something wrong" })
                }

                // if (popularManga) {
                //     console.log(popularManga,"This is popular")
                // }

                return res.status(200).json({ success: true, popularManga })
            }

            catch (error) {
                return res.status(500).json({ success: false, message: error.message })
            }
        }


        if (sort === "Recommended") {
            query["manga.Recommended"] = true
        }




        if (category) {
            console.log(category?.split(","), " This is category")
            const categoryArray = category?.split(",");
            query["manga.genres"] = { $all: categoryArray };
        }
        if (subCategory) {
            console.log(subCategory?.split(","), " This is category")
            const subCategoryArray = subCategory?.split(",");
            query["manga.subGenres"] = { $all: subCategoryArray };
        }
        

        if (sort === "Latest") {


            try {
                const latestChapters = await chapterModel.aggregate([
                    {
                        $sort: {
                            createdAt: -1
                        }
                    },
                    {
                        $group: {
                            _id: "$managaId",
                            latestChapters: {
                                $firstN: {
                                    input: "$$ROOT",
                                    n: 2
                                }
                            },
                            lastUpdated: { $first: "$createdAt" }
                        }
                    },
                    // {
                    //     $replaceRoot: {
                    //         newRoot: "$latestChapter"
                    //     }
                    // },
                    {
                        $lookup: {
                            from: "mangas",
                            localField: "_id",
                            foreignField: "_id",
                            as: "manga"

                        }
                    },
                    {
                        $unwind: "$manga"
                    },
                    {
                        // $sort: {
                        //     createdAt: -1
                        // }
                        $sort: { lastUpdated: -1 }
                    },
                    {
                        $limit: limit
                    }
                ])

                return res.status(200).json({ success: true, latestChapters })

            }
            catch (error) {
                console.log(error)
                return res.status(500).json({ success: false, message: "There is some issue, Please try again later" })
            }
        }




       

        let sortOption = { "manga.createdAt": -1 };
        if (sort === "A-Z") sortOption = { "manga.name": 1 };
        if (sort === "Z-A") sortOption = { "manga.name": -1 };
        if (sort === "Oldest") sortOption = { "manga.createdAt": 1 };
        if (sort === "Recommended") sortOption = { "manga.createdAt": -1 };










        const getMangas =
            await chapterModel.aggregate([
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $group: {
                        _id: "$managaId",
                        latestChapters: {
                            $firstN: {
                                input: "$$ROOT",
                                n: 2
                            }
                        }
                    }
                },

                {
                    $lookup: {
                        from: "mangas",
                        localField: "_id",
                        foreignField: "_id",
                        as: "manga",
                    }
                },
                {
                    $unwind: "$manga"
                },

                {
                    $match: query


                },
                {
                    $facet: {
                        data: [
                            {
                                $sort: sortOption
                            },
                            {
                                $skip: skip
                            },
                            {
                                $limit: limit
                            }
                        ],

                        totalCount: [
                            {
                                $count: "count"
                            }
                        ]
                    }
                }

            ])

        const pageInfo = getMangas[0]?.data;

        const total =
            getMangas[0].totalCount[0]?.count || 0;

        // if (pageInfo) {
        //     console.log(pageInfo[0].latestChapters[0], "This is pageInfo")
        // }




        const totalPages = Math.ceil(total / limit);

        return res.status(200).json({ success: true, pageInfo, total, totalPages })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}


const getManga = async (req, res) => {

    try {
        const id = req.query.mangaId
        console.log(id, "This is id")
        if (!id) {
            return res.status(500).json({ success: false, message: "Manag id is missing" })
        }
        const mangaInfo = await mangaModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "chapters",
                    localField: "_id",
                    foreignField: "managaId",
                    as: "chapters",
                    pipeline: [
                        {
                            $sort: {
                                createdAt: -1
                            }
                        }
                    ]
                }
            },



        ])

        if (mangaInfo) {
            console.log(mangaInfo[0])
        }



        return res.status(200).json({ success: true, mangaInfo: mangaInfo[0] })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }



}

const editManga = async (req, res) => {

    console.log(Object.values(req.body), "This is value")
    try {
        const coverImg = req?.file?.path


        const mangaValue = [
            "name",
            "artistName",
            "date",
            "authorName",
            "ongoing",
            "genres",
            "type",
            "description",
            "mangaId",
        ]

        const updateManga = {}

        mangaValue.forEach(element => {
            if (req.body[element] != undefined) {
                updateManga[element] = req.body[element]
            }
        });

        if (coverImg != undefined) {
            const result = await cloudinary.uploader.upload(coverImg, { folder: "manga", use_filename: true, unique_filename: true })
            updateManga["coverImg"] = result.secure_url
        }
        console.log(Object.keys(updateManga))


        const update = await mangaModel.findByIdAndUpdate(req?.body?.mangaId, {
            $set: updateManga
        },
            { new: true })

        return res.status(200).json({ success: true, update })
    }
    catch (error) {
        console.log(error, "Update error")
        return res.status(500).json({ success: false, message: "Something went wrong , Please try again later" })

    }


}


const deleteManga = async (req, res) => {
    const mangaId = req.query.mangaId
    console.log(req.query.mangaId, "Id hai ye")

    try {
        await mangaModel.findByIdAndDelete(mangaId)

        return res.status(200).json({ success: true, message: "Manga deleted successfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "-" })
    }
}

const savedCount = async (req, res) => {
    try {
        const mangaId = req?.params?.mangaId
        const user = req?.userId
        let countDone
        if (!mangaId) {
            console.log("No manga is present")
            console.log(user, "User id hai")

        }

        const manga = await mangaModel.findById(mangaId)

        if (!manga) {
            console.log(manga, "No manga with this")
        }

        const alreadyAdded = await manga.saved.includes(user)

        if (alreadyAdded) {
            countDone = await mangaModel.findByIdAndUpdate(mangaId, {
                $pull: {
                    saved: user
                }
            },
                {
                    new: true
                })
        }

        else {
            countDone = await mangaModel.findByIdAndUpdate(mangaId, {
                $addToSet: {
                    saved: user
                }
            },
                {
                    new: true
                })
        }





        const count = countDone?.saved?.length


        return res.status(200).json({ success: true, count, manga, countDone })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Something went wrong, Please try again later" })
    }



}

const getCount = async (req, res) => {
    try {
        const mangaId = req?.params?.mangaId

        if (!mangaId) {

            return res.status(400).json({ success: false, message: "There is no such manga" })

        }

        const manga = await mangaModel.findById(mangaId)

        if (manga) {
            return res.status(400).json({ success: false, message: "No manga is found" })
        }

        const count = manga?.saved?.length


        return res.status(200).json({ success: true, count, manga })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Something went wrong, Please try again later" })
    }



}

const getRecommendation = async (req, res) => {

    try {

        const genres = req.query?.genres
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 4
        const skip = (page - 1) * limit

        console.log(genres)

        if (!genres || genres.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Genres missing"
            })
        }
        const [recommendations, total] = await Promise.all([
            mangaModel.find({
                genres: {
                    $in: genres.split(",")
                }
            }).skip(skip).limit(limit),
            mangaModel.countDocuments({
                genres: {
                    $in: genres.split(",")
                }
            })
        ])




        const totalPages = Math.ceil(total / limit);

        return res.status(200).json({
            success: true,
            recommendations,
            totalPages,
            total
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}



export { addManga, getManga, getMangaInfo, editManga, deleteManga, savedCount, getCount, getRecommendation }