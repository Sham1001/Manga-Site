import fs from "fs"
import { v2 as cloudinary } from 'cloudinary'
import chapterModel from '../models/chapterModel.js'
import sharp from 'sharp'

const addChapter = async (req, res) => {
    try {
        const { chpName, chapNo, mangaId } = req.body
        const imageArr = req.files

        if (!chpName.trim()) {
            return res.status(400).json({ success: false, message: "Chap name is missing " })
        }

        if (!chapNo) {
            return res.status(400).json({ success: false, message: "Chap  Numberis missing " })
        }

        if (!mangaId) {
            return res.status(400).json({ success: false, message: "Please Slect a Manga" })
        }

        if (!imageArr) {
            return res.status(400).json({ success: false, message: "Chap Img is missing " })
        }

        const chapUrl = await Promise.all(
           imageArr.map(async(img)=>{
                let result = await cloudinary.uploader.upload(img.path,{folder:'chapter',resource_type: "image"})
                await fs.promises.unlink(img.path)
                return result.secure_url
            }),
           
        )

        
       



        const chapter = new chapterModel({
            name: chpName,
            chapterNo: chapNo,
            chapterPage: chapUrl,
            managaId: mangaId




        })

        await chapter.save()

        if (!chapter) {
            return res.status(500).json({ success: false, message: "Chapter is not added, Please try again later" })
        }

        return res.status(201).json({ success: true, message: "Chpter is added successfully " })

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Chapter is not added, Please try again later" })
    }


    // const 

}


const getChapter = async (req, res) => {

   

    const { mangaId, chpNo } = req.params

    if (!mangaId) {
        return res.status(400).json({ success: false, message: "Manga Id is missing" })
    }

    if (!chpNo) {
        return res.status(400).json({ success: false, message: "Chp No is missing" })
    }


    const totalChapters = await chapterModel.find({ managaId: mangaId }, "chapterNo")


    const chapter = await chapterModel.findOne({
        managaId: mangaId,
        chapterNo: chpNo
    }).populate("managaId", "name")

    if (!chapter) {
        return res.status(200).json({ success: true, message: "No chp is available, please check again later" })
    }

    return res.status(200).json({ success: true, chapter, totalChapters })
}

const totalChapter = async (req, res) => {
    try {
        const mangaId = req.params.mangaId

        const allChapter = await chapterModel.find({ managaId: mangaId }).sort({ chapterNo: -1 })
        return res.status(200).json({ success: true, allChapter })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json(`{success:false, message:${error}}`)
    }
}

const updateChapter = async (req, res) => {
    try {
        const { chapterId } = req.params

        const existingChapter = await chapterModel.findById(chapterId)
        if (!existingChapter) {
            return res.json({ success: false, message: "Chapter not found" })
        }

        const { chapterName, chapterNo, pageMeta } = req.body

        
        const parsedMeta = JSON.parse(pageMeta)

    
        const uploadedFiles = req.files || []
        let fileIndex = 0

        
        const finalPages = []

        for (const meta of parsedMeta) {
            if (meta.isNew) {
                const file = uploadedFiles[fileIndex]
                fileIndex++

                if (!file) {
                    return res.json({ success: false, message: `Missing file for page ${meta.index}` })
                }

                // Upload buffer to cloudinary
                const uploaded = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: "manga_pages" },
                        (error, result) => {
                            if (error) reject(error)
                            else resolve(result)
                        }
                    )
                    stream.end(file.buffer)
                })

                finalPages.push(uploaded.secure_url)

            } else {
                finalPages.push(meta.existingUrl)
            }
        }

        const updateFields = {
            chapterPage: finalPages
        }

        if (chapterName !== undefined) updateFields.name = chapterName
        if (chapterNo !== undefined) updateFields.chapterNo = Number(chapterNo)

        const updatedChapter = await chapterModel.findByIdAndUpdate(
            chapterId,
            updateFields,
            { new: true }
        )

        return res.json({
            success: true,
            message: "Chapter updated successfully",
            chapter: updatedChapter
        })

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

const chpDelete = async(req,res)=>{
    try{
        console.log(req.params.chpId,"Here the id")
        const {chpId} = req.params
    if(!chpId){
        return res.status(400).json({ success: false, message:"Chp is missing" })
    }

    await chapterModel.findByIdAndDelete(chpId)

    return res.status(200).json({ success: true, message:"Chp deleted successfully" })
    }
    catch(error){
        return res.status(500).json({ success: false, message:error.message })
    }
}

export { addChapter, getChapter, totalChapter, updateChapter, chpDelete }