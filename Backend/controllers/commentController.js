// import commentModel from "../models/commentModel.js";

// const addComment = async (req, res) => {
//     try {
//         const { text, contentTypeId, parentCommentId } = req.body
//         const userId = req.userId

//         if (!text.trim()) {
//             return res.status(200).json({ success: false, message: "Comment text is missing" })
//         }
//         if (!contentTypeId) {
//             return res.status(400).json({ success: false, message: "Content type Id is missing" })
//         }
//         const newComment = new commentModel({
//             text,
//             user: userId,
//             parentComment: parentCommentId || null,
//             contentId: contentTypeId
//         })

//         await newComment.save()

//         if (!newComment) {
//             return res.status(500).json({ success: false, message: "Comment is not added, Please try again Later" })
//         }

//         return res.status(201).json({ success: true, message: "Comment is added successfully" })


//     }
//     catch (error) {
//         console.log(error)
//         return res.status(500).json({ success: false, message: "Comment is not added, Please try again Later" })
//     }
// }

// const getComments = async (req, res) => {
//     try {

//         const contentTypeId = req.params.contentTypeId
      

//         if (!contentTypeId) {
//             return res.status(500).json({ success: false, message: "Content type Id is missing" })
//         }



//         const comments = await commentModel.find({ contentId: contentTypeId }).lean().populate("user", "name profileImg")

//         const commentMap = {}
//         const rootComments = []

//         comments.forEach(comment => (
//             comment.replies = [],
//             commentMap[comment._id] = comment
//         ))

//         comments.forEach(comment => {
//             if (comment.parentComment) {
//                 commentMap[comment.parentComment]?.replies.push(comment)
//             }
//             else {
//                 rootComments.push(comment)
//             }
//         })

//         rootComments.sort(
//             (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );


//         function sortReplies(comments) {
//             comments.forEach(comment => {
//                 comment.replies.sort(
//                     (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//                 );

//                 sortReplies(comment.replies);
//             });
//         }

//         sortReplies(rootComments);

//         return res.status(200).json({success:true, rootComments})

//     }




//     catch (error) {
//         console.log(error)
//         return res.status(500).json({ success: false, message: "Something went wrong, Please try again Later" })
//     }
// }


// const updateComment = async(req,res)=>{
//     try{
//         const {text} = req.body
//         const commentId = req.params.id

//         if(!commentId){
//             return res.status(400).json({ success: false, message: "CommentId is missing" })
//         }
//         if(!text.trim()){
//             return res.status(400).json({ success: false, message: "Comment Content is missing" })
//         }

//         const isUserComment = await commentModel.findById(commentId)

//         if(isUserComment.user != req.userId){
//             return res.status(403).json({success:false, message:"You are not authorized to update this comment"})
//         }

//         const checkDeleted = await commentModel.findById(commentId)

//         if(checkDeleted.isDeleted){
//             return res.status(200).json({success:true, message:"Comment is deleted, You cant edit It"})
//         }

//         await commentModel.findByIdAndUpdate(commentId,{
//             text:text,
//             isEdited:true
//         },
//     {
//         new:true
//     })
//         return res.status(200).json({success:true, message:"Comment is updated successfully"})
//     }
//     catch(error){
//         console.log(error)
//         return res.status(500).json({ success: false, message: "Something went wrong, Please try again Later" })
//     }
// }

// const deleteComment = async(req,res) => {
//   try {
//     const commentId = req.params.id

//     if(!commentId){
//         return res.status(400).json({ success: false, message: "CommentId is missing" })
//     }

//     const isUserComment = await commentModel.findById(commentId)

//     if(!isUserComment){
//         return res.status(404).json({success:false, message:"Comment not found"})
//     }

//     if(isUserComment.user != req.userId){
//             return res.status(403).json({success:false, message:"You are not authorized to delete this comment"})
//         }
    
//     const isAlreadyDeleted = await commentModel.findById(commentId)

//     if(isAlreadyDeleted.isDeleted){
//             return res.status(200).json({ success:false, message:"Commet is already is deleted" });
//         }

//     const deleted = await commentModel.findByIdAndUpdate(
//       commentId,
//       {
//         isDeleted: true,
//         text: "[deleted]"
//       },
//       { new: true }
//     );

//     res.status(200).json({
//      success:true,
//      message: "Comment deleted",
      
//     });
//   } catch (err) {
//     res.status(500).json({ success:false, message:"Something went wrong, Please try again Later" });
//   }
// };



// export {addComment, getComments ,updateComment, deleteComment}













import commentModel from "../models/commentModel.js";
import { sanitizeCommentHtml } from "../utils/sanitizeCommentHtml.js";
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'

// const addComment = async (req, res) => {
//     try {
//         const { text, contentTypeId, parentCommentId } = req.body
//         const image = req.file?.path
//         const userId = req.userId

//         // if (!text.trim() || !image) {
//         //     return res.status(200).json({ success: false, message: "Comment text is missing" })
//         // }
//         if (!contentTypeId) {
//             return res.status(400).json({ success: false, message: "Content type Id is missing" })
//         }

//         const cleanText = sanitizeCommentHtml(text)

//         const result = await cloudinary.uploader.upload(image, { folder: "comment", use_filename: true, unique_filename: true })
        
        
//         const newComment = new commentModel({
//             text: cleanText,
//             imageUrl:  result?.secure_url || null,
//             user: userId,
//             parentComment: parentCommentId || null,
//             contentId: contentTypeId
//         })

        

//         await newComment.save()

//         await fs.promises.unlink(image);


//         if (!newComment) {
//             return res.status(500).json({ success: false, message: "Comment is not added, Please try again Later" })
//         }

//         return res.status(201).json({ success: true, message: "Comment is added successfully" })


//     }
//     catch (error) {
//         console.log(error)
//         return res.status(500).json({ success: false, message: "Comment is not added, Please try again Later" })
//     }
// }


const addComment = async (req, res) => {
    try {
        const { text = "", contentTypeId, parentCommentId } = req.body
        const image = req.file?.path
        const userId = req.userId

        console.log("req.file:", req.file)

        if (!contentTypeId) {
            if (image) await fs.promises.unlink(image).catch(() => {})
            return res.status(400).json({ success: false, message: "Content type Id is missing" })
        }

        if (!text.trim() && !image) {
            return res.status(200).json({ success: false, message: "Comment text is missing" })
        }

        let imageUrl = null
        if (image) {
            try {
                const result = await cloudinary.uploader.upload(image, {
                    folder: "comment",
                    use_filename: true,
                    unique_filename: true
                })
                imageUrl = result.secure_url
            } finally {
                // runs whether the upload worked or threw, so no temp file is left behind
                await fs.promises.unlink(image).catch(() => {})
            }
        }

        const newComment = new commentModel({
            text: sanitizeCommentHtml(text),
            imageUrl,
            user: userId,
            parentComment: parentCommentId || null,
            contentId: contentTypeId
        })

        await newComment.save()

        return res.status(201).json({ success: true, message: "Comment is added successfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Comment is not added, Please try again Later" })
    }
}
const getComments = async (req, res) => {
    try {

        const contentTypeId = req.params.contentTypeId
        const sort = req.query.sort || "new" // 'new' | 'old' | 'best'


        if (!contentTypeId) {
            return res.status(500).json({ success: false, message: "Content type Id is missing" })
        }



        const comments = await commentModel.find({ contentId: contentTypeId }).lean().populate("user", "name profileImg")

        const commentMap = {}
        const rootComments = []

        comments.forEach(comment => (
            comment.replies = [],
            commentMap[comment._id] = comment
        ))

        comments.forEach(comment => {
            if (comment.parentComment) {
                commentMap[comment.parentComment]?.replies.push(comment)
            }
            else {
                rootComments.push(comment)
            }
        })

        if (sort === "old") {
            rootComments.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
        } else if (sort === "best") {
            rootComments.sort(
                (a, b) =>
                    ((b.likes?.length || 0) - (b.dislikes?.length || 0)) -
                    ((a.likes?.length || 0) - (a.dislikes?.length || 0))
            );
        } else {
            rootComments.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
        }


        function sortReplies(comments) {
            comments.forEach(comment => {
                comment.replies.sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                );

                sortReplies(comment.replies);
            });
        }

        sortReplies(rootComments);

        return res.status(200).json({success:true, rootComments})

    }




    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Something went wrong, Please try again Later" })
    }
}


const updateComment = async(req,res)=>{
    try{
        const {text} = req.body
        const commentId = req.params.id

        if(!commentId){
            return res.status(400).json({ success: false, message: "CommentId is missing" })
        }
        if(!text.trim()){
            return res.status(400).json({ success: false, message: "Comment Content is missing" })
        }

        const isUserComment = await commentModel.findById(commentId)

        if(isUserComment.user != req.userId){
            return res.status(403).json({success:false, message:"You are not authorized to update this comment"})
        }

        const checkDeleted = await commentModel.findById(commentId)

        if(checkDeleted.isDeleted){
            return res.status(200).json({success:true, message:"Comment is deleted, You cant edit It"})
        }

        const cleanText = sanitizeCommentHtml(text)

        await commentModel.findByIdAndUpdate(commentId,{
            text:cleanText,
            isEdited:true
        },
    {
        new:true
    })
        return res.status(200).json({success:true, message:"Comment is updated successfully"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ success: false, message: "Something went wrong, Please try again Later" })
    }
}

const deleteComment = async(req,res) => {
  try {
    const commentId = req.params.id

    if(!commentId){
        return res.status(400).json({ success: false, message: "CommentId is missing" })
    }

    const isUserComment = await commentModel.findById(commentId)

    if(!isUserComment){
        return res.status(404).json({success:false, message:"Comment not found"})
    }

    if(isUserComment.user != req.userId){
            return res.status(403).json({success:false, message:"You are not authorized to delete this comment"})
        }
    
    const isAlreadyDeleted = await commentModel.findById(commentId)

    if(isAlreadyDeleted.isDeleted){
            return res.status(200).json({ success:false, message:"Commet is already is deleted" });
        }

    const deleted = await commentModel.findByIdAndUpdate(
      commentId,
      {
        isDeleted: true,
        text: "[deleted]"
      },
      { new: true }
    );

    res.status(200).json({
     success:true,
     message: "Comment deleted",
      
    });
  } catch (err) {
    res.status(500).json({ success:false, message:"Something went wrong, Please try again Later" });
  }
};

/**
 * type is 'like' or 'dislike'. Toggles: clicking the same vote again
 * removes it, clicking the other one switches. One vote per user, same
 * pattern as your existing addFav toggle in userController.js.
 */
const voteComment = async (req, res) => {
    try {
        const commentId = req.params.id
        const userId = req.userId
        const { type } = req.body

        if (type !== "like" && type !== "dislike") {
            return res.status(400).json({ success: false, message: "type must be 'like' or 'dislike'" })
        }

        const comment = await commentModel.findById(commentId)
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" })
        }

        const alreadyLiked = comment.likes.some(id => id.toString() === userId)
        const alreadyDisliked = comment.dislikes.some(id => id.toString() === userId)

        comment.likes = comment.likes.filter(id => id.toString() !== userId)
        comment.dislikes = comment.dislikes.filter(id => id.toString() !== userId)

        if (type === "like" && !alreadyLiked) comment.likes.push(userId)
        if (type === "dislike" && !alreadyDisliked) comment.dislikes.push(userId)

        await comment.save()

        return res.status(200).json({
            success: true,
            likes: comment.likes.length,
            dislikes: comment.dislikes.length
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Something went wrong, Please try again Later" })
    }
}



export {addComment, getComments ,updateComment, deleteComment, voteComment}