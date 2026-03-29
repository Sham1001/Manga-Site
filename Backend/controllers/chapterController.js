import fs from "fs"
import { v2 as cloudinary } from 'cloudinary'
import chapterModel from '../models/chapterModel.js'


const addChapter = async(req,res)=>{
   try{
     const {chpName, chapNo, mangaId} = req.body
    const imageArr = req.files

    console.log(mangaId,"This is Id")

    if(!chpName.trim()){
        return res.status(400).json({success:false, message:"Chap name is missing "})
    }

    if(!chapNo){
        return res.status(400).json({success:false, message:"Chap  Numberis missing "})
    }

    if(!mangaId){
        return res.status(400).json({success:false, message:"Chap Id is missing "})
    }

    if(!imageArr){
        return res.status(400).json({success:false, message:"Chap Img is missing "})
    }

    const chapUrl = await Promise.all(
       imageArr.map(async(img)=>{
            let result = await cloudinary.uploader.upload(img.path,{folder:'chapter',resource_type: "image"})
            return result.secure_url
        }),
        // fs.promises.unlink(img.path)
    )



    const chapter =  new chapterModel({
        name:chpName,
        chapterNo: chapNo,
        chapterPage:chapUrl,
        managaId:mangaId

        


    })

    await chapter.save()

    if(!chapter){
        return res.status(500).json({success:false, message:"Chapter is not added, Please try again later"})
    }

    return res.status(201).json({success:true, message:"Chpter is added successfully "})

   }
   catch(error){
    console.log(error)
     return res.status(500).json({success:false, message:"Chapter is not added, Please try again later"})
   }

    
    // const 

}


const getChapter = async(req, res)=>{

    // ${mangaId}/${chpNo}
    // const {MangaChpId, chpNo} = req.query

    const {mangaId,chpNo} = req.params
    
    if(!mangaId){
        return res.status(400).json({success:false, message:"Manga Id is missing"})
    }

    if(!chpNo){
        return res.status(400).json({success:false, message:"Chp No is missing"})
    }


    const totalChapters = await chapterModel.find({managaId:mangaId},"chapterNo")


    const chapter = await chapterModel.findOne({
        managaId:mangaId,
        chapterNo:chpNo
    }).populate("managaId","name")

    if(!chapter){
        return res.status(200).json({success:true, message:"No chp is available, please check again later"})
    }

    return res.status(200).json({success:true, chapter, totalChapters})
}

const totalChapter = async(req,res)=>{
    try{
        const mangaId = req.params.mangaId

        const allChapter = await chapterModel.find({managaId:mangaId}).sort({chapterNo: -1})
        return res.status(200).json({success:true, allChapter})
    }
    catch(error){
        console.log(error)
         return res.status(500).json(`{success:false, message:${error}}`)
    }
}

export {addChapter, getChapter, totalChapter}