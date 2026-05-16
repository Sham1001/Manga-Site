import commentModel from "../models/commentModel.js";
// import mangaModel from "../models/mangaModel";
// import chapterModel from "../models/chapterModel";


const addComment = async (req, res) => {
    try {
        const { text, contentTypeId, parentCommentId } = req.body
        const userId = req.userId

        if (!text.trim()) {
            return res.status(200).json({ success: false, message: "Comment text is missing" })
        }
        if (!contentTypeId) {
            return res.status(400).json({ success: false, message: "Content type Id is missing" })
        }
        const newComment = new commentModel({
            text,
            user: userId,
            parentComment: parentCommentId || null,
            contentId: contentTypeId
        })

        await newComment.save()

        if (!newComment) {
            return res.status(500).json({ success: false, message: "Comment is not added, Please try again Later" })
        }

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
        // const contentType = req.query.contentType

        if (!contentTypeId) {
            return res.status(500).json({ success: false, message: "Content type Id is missing" })
        }

        // if(!contentType){
        //     return res.status(500).json({success:false, message:"Content type is missing"})
        // }


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

        rootComments.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );


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

        await commentModel.findByIdAndUpdate(commentId,{
            text:text,
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



export {addComment, getComments ,updateComment, deleteComment}