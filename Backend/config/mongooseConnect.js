import mongoose from "mongoose";

const MongoDb = async()=>{

    try{
        mongoose.connection.on("connected",()=>
        console.log("MongoDb is connected"))

        await mongoose.connect(`${process.env.MONGODB_URI}/Manga`)
    }
    catch(error){
         console.log("The is some error:",error)
    }
}

export default MongoDb