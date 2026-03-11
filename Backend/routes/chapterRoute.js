import { addChapter, getChapter } from "../controllers/chapterController.js";
import express from 'express'
import upload from '../middleware/multer.js'


const chapterRoute = express.Router()


chapterRoute.post('/add', upload.array('imageArr'),addChapter)
chapterRoute.get('/:mangaId/:chpNo', getChapter)


export default chapterRoute