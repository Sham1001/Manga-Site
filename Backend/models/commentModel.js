import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    text:{
        type:String,
        required:true
    },
    user:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    contentType:{
        type:String,
        required:true
    }
},{timestamps:true})

const commentModel = mongoose.models.Comment || mongoose.model("Comment",commentSchema)
export default commentModel 