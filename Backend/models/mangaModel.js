// import mongoose, { Schema } from "mongoose"


// const mangaSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         unique: true,
//         // lowercase: true
//     },
//     authorName: {

//         type: String,
//         required: true,

//     },
//     artistName:{
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         required: true
//     },
//     genres: {
//         type: [String],
//         required: true,
//         default: []
//     },
//     subGenres: {
//         type: [String],
//         required: true,
//         default: []
//     },
//     coverImg: {
//         type: String,
//         required: true
//     },
//     popular: {
//         type: Boolean,
//         required: true
//     },
//     ongoing: {
//         type: Boolean,
//         required: true
//     },
//     Recommended: {
//         type: Boolean,
//         require: true
//     },
//     type: {
//         type: String,
//         required: true
//     },
//     saved:[
//         {
//         type:Schema.Types.ObjectId,
//         ref:"User",
//         default:[]
//         }
//     ],
//     chapter: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: "Chapter"
//         }
//     ],
//     comments: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: "Comment"
//         }
//     ]

// }, { timestamps: true })

// const mangaModel = mongoose.models.Manga || mongoose.model("Manga", mangaSchema)
// export default mangaModel




import mongoose, { Schema } from "mongoose"


const mangaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        // lowercase: true
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
    Recommended: {
        type: Boolean,
        require: true
    },
    type: {
        type: String,
        required: true
    },
    saved:[
        {
        type:Schema.Types.ObjectId,
        ref:"User",
        default:[]
        }
    ],
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
    ],
    // emoji -> count, e.g. { "❤️": 12, "😂": 4 }
    reactions: {
        type: Map,
        of: Number,
        default: {}
    },
    // userId (string) -> the single emoji that user picked, so a repeat
    // click can be told apart from a switch to a different emoji
    userReactions: {
        type: Map,
        of: String,
        default: {}
    }

}, { timestamps: true })

const mangaModel = mongoose.models.Manga || mongoose.model("Manga", mangaSchema)
export default mangaModel