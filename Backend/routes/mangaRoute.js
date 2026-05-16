import { addManga, getMangaInfo, getManga, editManga, deleteManga, savedCount, getCount, getRecommendation} from "../controllers/mangaController.js";
import userCheck from '../middleware/userAuth.js'
import express from "express"
// import adminCheck from '../middleware/adminAuth.js'
import upload from '../middleware/multer.js'


const mangaRoute = express.Router()


mangaRoute.post("/add",upload.single("image"),addManga)
mangaRoute.get("/mangaInfo",getMangaInfo)
mangaRoute.get("/singleManga", getManga)
mangaRoute.patch("/edit", upload.single('coverImg'), editManga)
mangaRoute.delete("/delete", deleteManga)
mangaRoute.get("/recommendation", getRecommendation)
mangaRoute.get("/:mangaId", userCheck, savedCount)
mangaRoute.get("/count/:mangaId", getCount)


export default mangaRoute