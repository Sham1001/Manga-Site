import {v2 as cloudinary} from 'cloudinary'

const cloudinaryConfig =async()=>{
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key:process.env.CLOUDINARY_KEY,
         api_secret:process.env.CLOUDINARY_SECREAT
        
        
    });
    console.log("The cloudinary is connected")
}

export default cloudinaryConfig