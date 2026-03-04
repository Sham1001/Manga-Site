import mongoose, { Schema } from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        unique:true,
        lowercase:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    favorites:[
        {
            type:Schema.Types.ObjectId,
            ref:"Manga"
        }
    ],
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]

},{timestamps:true})




userSchema.statics.isPasswordStrong=(password)=>{
    const minLength = 8
    const capitalWord = /[A-Z]/.test(password)
    const smallWord = /[a-z]/.test(password)
    const hasNum = /\d/.test(password)
    const specialChar =  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)

    return(
        minLength <= password.length &&
        capitalWord &&
        smallWord &&
        hasNum &&
        specialChar
    )
}


userSchema.statics.passwordFeedback = ()=>{
     const feedback = []
    if(password.length < 8) feedback.push("Password must be at least 8 characters long.")
    if(!/[A-Z]/.test(password)) feedback.push("Password must have at least one upper letter")
    if(!/[a-z]/.test(password)) feedback.push("Password must contain at least one lowercase letter.")
    if (!/\d/.test(password)) feedback.push("Password must contain at least one number.");
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) feedback.push("Password must contain at least one special character.");

    return feedback.length === 0 ? "Password is strong" : feedback.join(", ")
}

export const userModel = mongoose.models.User || mongoose.model("User",userSchema)