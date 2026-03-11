import mongoose, { Schema } from "mongoose";

const chapterSchema = new Schema({
    name:{
        type:String,
        required:true
    },

    chapterNo:{
        type:Number,
        required:true
    },
    chapterPage:{
        type:[String],
        required:true,
        
    },
    managaId:{
        type:Schema.Types.ObjectId,
        ref:"Manga",
        required:true
    },
    comments:[{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    }],
    
},{timestamps:true})

const chapterModel = mongoose.models.Chapter || mongoose.model("Chapter",chapterSchema)

export default chapterModel