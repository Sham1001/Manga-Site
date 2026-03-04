import express from "express"
import  "dotenv/config"
import MongoDb from './config/mongooseConnect.js'
import cloudinaryConfig from './config/cloudinaryConnect.js'
import cors from "cors"
import userRoute from './routes/userRoute.js'
import mangaRoute from './routes/mangaRoute.js'

const app = express()
const port = process.env.PORT || 5000

MongoDb()
cloudinaryConfig()

app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{res.send("This is working")})
app.use('/api/user',userRoute)
app.use('/api/manga',mangaRoute)

app.listen(port,()=>console.log("Server is working :" +port))
