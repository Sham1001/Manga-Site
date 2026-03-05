import mangaModel from "../models/mangaModel.js";
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import { promises } from "dns";


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

        const isName = await mangaModel.findOne({ name })

        if (isName) {
            return res.json({ success: false, message: "This name exists in Data Base , Name should be uniqe" })
        }



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

        const name = req.body
        
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
            query.popular = true
        }

        if (sort === "Recommended" || sort === "Relevant") {
            query.Recommended = true
        }




if (category) {
  const categoryArray = category.split(",");
  query.genres = { $all: categoryArray };
}

        // if(sort === "Latest"){
        //      let sortOption = { createdAt: -1 };  // latest default
        // }

//         console.log("Category from frontend:", category);
// console.log("Final Mongo Query:", req.query);
    // console.log(name.sort,"This is body")


        let sortOption = { createdAt: -1 }
        // if (sort === "rating") sortOption = { rating: -1 };
        if (sort === "A-Z") sortOption = { name: 1 };
        if (sort === "Z-A") sortOption = { name: -1 };
        if (sort === "Oldest") sortOption = { name: 1 };


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


const getManga = async(req,res)=>{
    
    const {id} = req.body
    if(!id){
        return res.status(500).json({success:false, message:"Manag id is missing"})
    }
    const mangaInfo = await mangaModel.findById(id)

    return res.status(200).json({success:true, mangaInfo})



}

export { addManga,getManga, getMangaInfo }