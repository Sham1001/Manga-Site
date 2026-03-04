import mangaModel from "../models/mangaModel.js";
import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary'
import { promises } from "dns";


const addManga = async(req,res)=>{
    const {name,authName,description,date,genres,subGenres,popular,complete,type,recommended} = req.body
    const image = req.file?.path

    try{
        if(!name){
        return res.status(400).json({success:false,message:"Name is missing"})
    }

    if(!authName){
        return res.status(400).json({success:false,message:"Author is missing"})
    }

    if(!description){
        return res.status(400).json({success:false,message:"Description is missing"})
    }

    if(!date){
        return res.status(400).json({success:false,message:"Date is missing"})
    }

    if(!genres){
        return res.status(400).json({success:false,message:"Genres is missing"})
    }

    if(popular === undefined){
        return res.status(400).json({success:false,message:"Popular is missing"})
    }

    if(complete === undefined){
        return res.status(400).json({success:false,message:"Ongoing is missing"})
    }

    if(!type){
        return res.status(400).json({success:false,message:"Type is missing"})
    }

    if(!image){
        return res.status(400).json({success:false,message:"CoverImg is missing"})
    }

   const isName = await mangaModel.findOne({name})

   if(isName){
    return res.json({success:false,message:"This name exists in Data Base , Name should be uniqe"})
   }

   

   const result = await cloudinary.uploader.upload(image,{folder:"manga",use_filename:true,unique_filename:true})

    await fs.promises.unlink(image);


    const manga = new mangaModel({
        name,
        authorName:authName,
        description,
        date,
        genres,
        subGenres,
        popular,
        ongoing:complete,
        type,
        Recommended:recommended,
        coverImg:result.secure_url
    })

    await manga.save()

    return res.status(200).json({success:true,message:"Manga added successfully"})
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}


const getMangaInfo = async(req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 12
        const sort = req.query.sort || "latest"
        const search = req.query.search || "";
        const skip = (page - 1) * limit

        console.log(limit)
        const query = {}

        if(search){
            query.name ={
                $regex:search, $options:"i"
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


        if(sort==="popular"){
            query.popular = true
        }

        if(sort==="Recommended"){
            query.Recommended = true
        }

        let sortOption = { createdAt: -1 }; // latest default
        // if (sort === "rating") sortOption = { rating: -1 };
        // if (sort === "az") sortOption = { title: 1 };

        const [pageInfo,total] = await Promise.all([
            mangaModel.find(query).sort(sortOption).skip(skip).limit(limit),
            mangaModel.countDocuments(query)
        ])


       const totalPages = Math.ceil(total / limit);


        const mangaInfo = await mangaModel.find({}).skip(skip).limit(limit)
        return res.status(200).json({success:true,pageInfo,total,totalPages})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:error.message})
    }
}

export {addManga,getMangaInfo}