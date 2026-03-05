import { addManga, getMangaInfo, getManga } from "../controllers/mangaController.js";
import express from "express"
// import adminCheck from '../middleware/adminAuth.js'
import upload from '../middleware/multer.js'


const mangaRoute = express.Router()


mangaRoute.post("/add",upload.single("image"),addManga)
mangaRoute.get("/mangaInfo",getMangaInfo)
mangaRoute.get("/singleManga", getManga)

export default mangaRoute