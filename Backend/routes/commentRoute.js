import {addComment, getComments ,updateComment, deleteComment} from "../controllers/commentController.js"
import express, { Router } from 'express'
import userCheck from '../middleware/userAuth.js'


const commentRoute = express.Router()

commentRoute.post('/add', userCheck, addComment)
commentRoute.get('/get/:contentTypeId', getComments)
commentRoute.patch('/upate/:id',userCheck, updateComment)
commentRoute.delete('/delete/:id',userCheck, deleteComment)

export default commentRoute