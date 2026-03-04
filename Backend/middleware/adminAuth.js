import jwt from "jsonwebtoken"

const adminCheck=(req,res,next)=>{
    const {token} = req.headers
    if(!token){
        return res.json({success:false,message:"Only admin an do this task"})
    }

    try{
        const adminVerify = jwt.verify(token,process.env.JWT_KEY)
    if(adminVerify.email !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
        return res.json({success:false,message:"Email or password is wrong"})
    }

    next()
    }
    catch(error){
        if(error == "TokenExpiredError"){
            return res.json({success:false,message:"Login Again"})
        }

        console.log(error)
        return res.json({success:false,message:error.message})
        
    }
}

export default adminCheck