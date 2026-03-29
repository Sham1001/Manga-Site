import mongoose, { Schema } from "mongoose"


const mangaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    authorName: {

        type: String,
        required: true,

    },
    artistName:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    genres: {
        type: [String],
        required: true,
        default: []
    },
    subGenres: {
        type: [String],
        required: true,
        default: []
    },
    coverImg: {
        type: String,
        required: true
    },
    popular: {
        type: Boolean,
        required: true
    },
    ongoing: {
        type: Boolean,
        required: true
    },
    // status:{
    //     type: String,
    //     required: true
    // },

    Recommended: {
        type: Boolean,
        require: true
    },
    type: {
        type: String,
        required: true
    },
    chapter: [
        {
            type: Schema.Types.ObjectId,
            ref: "Chapter"
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]

}, { timestamps: true })

const mangaModel = mongoose.models.Manga || mongoose.model("Manga", mangaSchema)
export default mangaModel