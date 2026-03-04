// import mangaModel from '../models/mangaModel.js'
import {userRegistor,userLogin,adminLogin,addFav,removeFav,userProfile} from '../controllers/userController.js'
import userCheck from '../middleware/userAuth.js'
import express from "express"

const userRoute = express.Router()

userRoute.post('/register',userRegistor)
userRoute.post('/login',userLogin)
userRoute.post('/admin/login',adminLogin)
userRoute.post('/Favorites',userCheck,addFav)
userRoute.get('/profile',userCheck,userProfile)
userRoute.delete('/Favorites',userCheck,removeFav)

export default userRoute
