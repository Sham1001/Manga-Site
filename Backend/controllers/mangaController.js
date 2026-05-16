import mangaModel from "../models/mangaModel.js";
import chapterModel from '../models/chapterModel.js'
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import { group } from "console";
import { lookup } from "dns";
import { format } from "path";
// import { promises } from "dns";


const addManga = async (req, res) => {
    const { name, authName, description, date, genres, subGenres, popular, complete, type, recommended } = req.body
    const image = req.file?.path

    try {
        if (!name) {
            return res.status(400).json({ success: false, message: "Name is missing" })
        }

        if (!authName) {
            return res.status(400).json({ success: false, message: "Author is missing" })
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

        // const isName = await mangaModel.findOne({ name })

        // if (isName) {
        //     return res.json({ success: false, message: "This name exists in Data Base , Name should be uniqe" })
        // }



        const result = await cloudinary.uploader.upload(image, { folder: "manga", use_filename: true, unique_filename: true })

        await fs.promises.unlink(image);


        const manga = new mangaModel({
            name,
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

        // const name = req.body

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 12
        const sort = req.query.sort || "latest"
        const search = req.query.search || "";
        const category = req.query.category
        const skip = (page - 1) * limit

        // console.log(category[0])
        const query = {}

        if (search) {
            query.name = {
                $regex: search, $options: "i"
            }
        }
        // if(sort==="latest"){
        //      const pageInfo = await mangaModel.find({}).skip(skip).limit(10)
        //      if(pageInfo.length != 0){
        //         return res.status(200).json({success:true,pageInfo})
        //     }
        //     else{
        //         return res.status(500).json({success:false,message:"No managa"})
        //     }
        // }
        // if(sort==="popular"){
        //     console.log("Entered")
        //     const pageInfo = await mangaModel.find({popular:true})
        //     if(pageInfo.length != 0){
        //         return res.status(200).json({success:true,pageInfo})
        //     }
        //     else{
        //         return res.status(500).json({success:false,message:"No popular managa"})
        //     }
        // }


        if (sort === "popular") {
            // query.popular = true

            try{
                const popularManga = await chapterModel.aggregate([

    {
        $sort: {
            createdAt: -1
        }
    },

    {
        $group: {
            _id: "$managaId",
            latestChapter: { $first: "$$ROOT" }
        }
    },

    {
        $replaceRoot: {
            newRoot: "$latestChapter"
        }
    },

    {
        $lookup: {
            from: "mangas",
            localField: "managaId",
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

            if(!popularManga){
                return res.status(500).json({ success: false, message:"Something wrong" })
            }

            return res.status(200).json({ success: true, popularManga })
            }

            catch(error){
                return res.status(500).json({ success: true, message:error.message })
            }
        }


        if (sort === "Recommended" || sort === "Relevant") {
            query.Recommended = true
        }




        if (category) {
            const categoryArray = category.split(",");
            query.genres = { $all: categoryArray };
        }

        if (sort === "Latest") {
            //  let sortOption = { createdAt: -1 };  // latest default

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
                            latestChapter: { $first: "$$ROOT" }
                        }
                    },
                    {
                        $replaceRoot: {
                            newRoot: "$latestChapter"
                        }
                    },
                    {
                        $lookup: {
                            from: "mangas",
                            localField: "managaId",
                            foreignField: "_id",
                            as: "manga"

                        }
                    },
                    {
                        $unwind: "$manga"
                    },
                    {
                        $sort: {
                            createdAt: -1
                        }
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

        //         console.log("Category from frontend:", category);
        // console.log("Final Mongo Query:", req.query);
        // console.log(name.sort,"This is body")


        let sortOption = { createdAt: -1 }
        // if (sort === "rating") sortOption = { rating: -1 };
        if (sort === "A-Z") sortOption = { name: 1 };
        if (sort === "Z-A") sortOption = { name: -1 };
        if (sort === "Oldest") sortOption = { createdAt: 1 };


        const [pageInfo, total] = await Promise.all([
            mangaModel.find(query).sort(sortOption).skip(skip).limit(limit),
            mangaModel.countDocuments(query)
        ])


        const totalPages = Math.ceil(total / limit);



        return res.status(200).json({ success: true, pageInfo, total, totalPages })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}


const getManga = async (req, res) => {

    const id = req.query.mangaId
    console.log(id, "This is id")
    if (!id) {
        return res.status(500).json({ success: false, message: "Manag id is missing" })
    }
    const mangaInfo = await mangaModel.findById(id)

    return res.status(200).json({ success: true, mangaInfo })



}

const editManga = async (req, res) => {
    // const {mangaName, artistName, releaseDate, authorName, status, genres, type, description, mangaId} = req.body
    // const mangaValue = req.body
    console.log(Object.values(req.body))
    try {
        const coverImg = req?.file?.path

        // const auth = req.body.author
        // const id = req?.body.mangaId

        const mangaValue = [
            "name",
            "artistName",
            "date",
            "authorName",
            "status",
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

            // await fs.promises.unlink(coverImg);
            updateManga["coverImg"] = result.secure_url
        }
        console.log(Object.keys(updateManga))
        // if(Object.keys(updateManga).length < 4){
        //     return res.status(401).json({success:false,message:"No changes is made"})
        // }

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


        return res.status(200).json({ success: true, count, manga })
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
            console.log(manga, "No manga with this")
            // return res.status(400).json({success:false, message:"No manga is found"})
        }

        // const alreadyAdded = await manga.saved.includes(user)

        // if(alreadyAdded){
        //     const  removeUserFav = await mangaModel.findByIdAndUpdate(mangaId,{
        //     $pull:{
        //         saved:user
        //     }
        // },
        // {
        //     new:true
        // })
        // }

        // else{
        //     const addedUserFav  = await mangaModel.findByIdAndUpdate(mangaId,{
        //     $addToSet:{
        //         saved:user
        //     }
        // },
        // {
        //     new:true
        // })
        // }





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