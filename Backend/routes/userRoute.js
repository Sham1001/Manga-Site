// import mangaModel from '../models/mangaModel.js'
import {userRegistor,userLogin,adminLogin,addFav,removeFav,userProfile,userFav, userProfileImg, changeDescription, changeUserName} from '../controllers/userController.js'
import userCheck from '../middleware/userAuth.js'
import express from "express"
import upload from '../middleware/multer.js'

const userRoute = express.Router()

userRoute.post('/register',userRegistor)
userRoute.post('/login',userLogin)
userRoute.post('/admin/login',adminLogin)
userRoute.post('/Favorites',userCheck,addFav)
userRoute.get('/profile',userCheck,userProfile)
userRoute.delete('/Favorites',userCheck,removeFav)
userRoute.get('/userFav',userCheck,userFav)
userRoute.post('/profileImg',userCheck,upload.single('userImg'), userProfileImg)
userRoute.patch('/changeUsername', userCheck, changeUserName )
userRoute.patch('/changeDescription', userCheck, changeDescription)

export default userRoute
