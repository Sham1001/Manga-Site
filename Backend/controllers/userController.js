import { userModel } from "../models/userModel.js";
// import {mangaModel} from "../models/mangaModel.js";
import validator from "validator"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
// import { v2 as cloudinary } from 'cloudinary'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import { OAuth2Client } from "google-auth-library";
import { mongoose } from "mongoose";


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



const createToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_KEY)
}

const userRegistor = async (req, res) => {
    const { name, email, password } = req.body
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Some field is missing " })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "The email is wrong" })
        }
        const isEmail = await userModel.findOne({ email })
        if (isEmail) {
            return res.status(400).json({ success: false, message: "The user already exist" })
        }
        const isPassword = await userModel.isPasswordStrong(password)

        if (!isPassword) {
            const feedback = await userModel.passwordFeedback(password)
            return res.status(400).json({ success: false, message: feedback })
        }

        const hashed = await bcrypt.hash(password, Number(process.env.BCRYPT))

        const userCreate = new userModel({
            name,
            email,
            password: hashed
        })

        const userSave = await userCreate.save()

        const token = createToken(userSave._id)

        return res.status(201).json({ success: true, token })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }



}

const userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, messsage: "Some value is missing" })
        }
        const isEmail = await userModel.findOne({ email })

        if (!isEmail) {
            return res.status(400).json({ success: false, message: "You need to register first" })
        }

        const correctPassword = await bcrypt.compare(password, isEmail.password)

        if (!correctPassword) {
            return res.status(400).json({ success: false, message: "password is wrong" })
        }

        const token = createToken(isEmail._id)

        return res.status(200).json({ success: true, token })

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

const adminLogin = (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Some value is missing" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "The email is not in correct format" })
        }

        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(400).json({ success: false, message: "Email is wrong" })
        }
        if (password !== process.env.ADMIN_PASSWORD) {
            return res.status(400).json({ success: false, message: "Password is wrong" })
        }

        const token = jwt.sign(email + password, process.env.JWT_KEY)

        return res.status(200).json({ success: true, token })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;

        
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        
        const payload = ticket.getPayload();

        const {
            email,
            name,
            picture,
        } = payload;

      
        let user = await userModel.findOne({ email });

        
        if (!user) {
            user = await userModel.create({
                email,
                name,
                profileImg: picture,
            });
        }

        
        const jwtToken = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_KEY,
            {
                expiresIn: "7d",
            }
        );

        return res.status(200).json({
            success: true,
            token: jwtToken,
            user,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Google Login Failed",
        });
    }
}

const addFav = async (req, res) => {
    const { mangaId } = req.body
    const userId = req.userId
    try {

        if (!mangaId) {
            return res.json({ success: false, message: "mangaId is missing" })
        }
        if (!userId) {
            return res.json({ success: false, message: "userId is missing" })
        }
        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: "Only login user can do this" })
        }

        if (user.favorites.includes(mangaId)) {
            user.favorites = user.favorites.filter(fil => fil.toString() != mangaId)
            await user.save()

            return res.status(200).json({ success: true, message: "Manga removed successfully" })
        }
        
        user.favorites.push(mangaId)
        await user.save()
        const fav = user
        return res.status(200).json({ success: true, message: "Manga Added successfully", user })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }

}

const removeFav = async (req, res) => {
    const { mangaId } = req.body
    const userId = req.userId
    try {
        if (!mangaId) {
            return res.status(400).json({ success: false, message: "mangaId is missing" })
        }
        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is missing" })
        }
        const newFav = await userModel.findById(userId)


        newFav.favorites = newFav.favorites.filter(fil => fil.toString() != mangaId)
        await newFav.save()

        return res.status(200).json({ success: true, message: "Manga removed successfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

const userProfile = async (req, res) => {
    const userId = req.userId
    const page = req.query.page
    const limit = req.query.limit || 3
    const decending = req.query.decending
    const skip = (page - 1) * limit

    try {

        if (!userId) {
            return res.json({ success: false, message: "Give user id" })
        }
        const user = await userModel.findById(userId)
       
        const fav = await userModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "mangas",
                    localField: "favorites",
                    foreignField: "_id",
                    as: "favManga",
                    pipeline: [
                        { $sort: { createdAt: -1 } },
                        {
                            $lookup: {
                                from: "chapters",
                                localField: "_id",
                                foreignField: "managaId",
                                as: "chapters"
                            }
                        },
                        {
                            $addFields: {
                                latestChapter: {
                                  $slice: [
                { $sortArray: { input: "$chapters", sortBy: { createdAt: -1 } } },
                2  
            ]
                                }
                            }
                        },
                        {
                            $addFields: {
                                latestChapterNo: "$latestChapter.chapterNo",
                                latestChapterDate: "$latestChapter.createdAt"
                            }
                        },
                        {
                            $project: {
                                chapters: 0, latestChapter: 0, description: 0, authorName: 0, date: 0, genres: 0, genres: 0, subGenres: 0, popular: 0,
                                ongoing: 0,
                                Recommended: 0,
                                type: 0,
                                saved: 0,
                                chapter: 0,
                                comments: 0,
                                createdAt: 0,
                                updatedAt:0
                            }
                        },


                        { $skip: skip },
                        { $limit: 4 }
                    ]
                }
            },


            {
                $addFields: {
                    totalCount: { $size: "$favorites" }
                }
            },
            {
                $project: { password: 0, favorites: 0 }
            }
        ]);
       




        const total = fav[0]?.totalCount





        const totalPages = Math.ceil(fav[0]?.totalCount / limit);

       



        return res.status(200).json({ success: true, user, fav: fav[0].favManga, totalPages, total })


       
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}


const userFav = async (req, res) => {

    const userId = req.userId
    try {

        const user = await userModel.findById(userId)
        const fav = user.favorites
        return res.status(200).json({ success: true, fav })

    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}


const userProfileImg = async (req, res) => {
    const img = req?.file?.path
    const id = req.userId

    if (!img) {
        return res.status(400).json({ success: false, message: "Profile img is missing" })
    }
    const imgLink = await cloudinary.uploader.upload(img, { folder: "user", use_filename: true, unique_filename: true })

    await fs.promises.unlink(img);

    const imgUploadedLink = await userModel.findByIdAndUpdate(id,
        { profileImg: imgLink.secure_url },
        { new: true }

    )



    return res.status(200).json({ success: true, imgUploadedLink })
}


const changeUserName = async (req, res) => {
    const userName = req.body.userName
    const id = req.userId

    if (!userName) {
        console.log(userName)
        return res.status(400).json({ success: false, message: "UserName is missing" })
    }

    const changeName = await userModel.findByIdAndUpdate(id,
        { name: userName },
        { new: true })

    const newUsername = changeName?.name


    if (!newUsername) {
        return res.status(400).json({ success: false, message: "Something went wrong please try again later" })
    }


    return res.status(200).json({ success: true, newUsername, changeName })

}


const changeDescription = async (req, res) => {
    const description = req.body.description
    const id = req.userId

    if (!description) {
        return res.status(400).json({ success: false, message: "description is missing" })
    }

    const changeDescription = await userModel.findByIdAndUpdate(id,
        { description: description },
        { new: true })

    const newDescription = changeDescription?.description


    if (!newDescription) {
        return res.status(400).json({ success: false, message: "Something went wrong please try again later" })
    }


    return res.status(200).json({ success: true, newDescription, changeDescription })
}





export { userRegistor, userLogin, adminLogin, addFav, removeFav, userProfile, userFav, userProfileImg, changeDescription, changeUserName, googleLogin }
