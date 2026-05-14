import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    },
    contentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    isEdited: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const commentModel = mongoose.models.Comment || mongoose.model("Comment", commentSchema)
export default commentModel 