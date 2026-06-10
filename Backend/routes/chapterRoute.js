import { addChapter, getChapter, totalChapter, updateChapter, chpDelete } from "../controllers/chapterController.js";
import express from 'express'
import upload from '../middleware/multer.js'


const chapterRoute = express.Router()


chapterRoute.post('/add', upload.array('imageArr'),addChapter)
chapterRoute.get('/:mangaId/:chpNo', getChapter)
chapterRoute.get('/:mangaId', totalChapter)
chapterRoute.put("/update/:chapterId", upload.array("pages"), updateChapter)
chapterRoute.delete('/delete/:chpId', chpDelete)


export default chapterRoute