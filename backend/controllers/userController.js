import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({success: false, message: "User does not exists!"});
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch) {
                const token = createToken(user._id);
                return res.json({success: true, token});
            } else {
                return res.json({success: false, message: "Invalid Password!"});
            }
        }
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const userExists = await userModel.findOne({email});
        if(userExists) {
            return res.json({success: false, message: "User Already Exists!"});
        } else if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Please Enter a valid Email"});
        } else if(password.length < 8) {
            return res.json({success: false, message: "Please Enter a strong Password"});
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new userModel({
                name,
                email,
                password: hashedPassword
            });
            const user = await newUser.save();
            const token = createToken(user._id);
            res.json({success: true, token});
        }
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

//route for admin login
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success: true, token});
        } else {
            res.json({success: false, message: "Enter valid Credentials!"});
        }
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export {loginUser, registerUser, adminLogin};