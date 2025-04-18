import usersModels from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET, {
        expiresIn: "6h",
    });
};
const generateRefreshToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET, {
        expiresIn: "7d",
    });
};

// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.SMTP_SECRET
//     }
// });

// Sign Up Api 

// await transporter.sendMail({
//     from: '"Umar Farooq 👻"',
//     to: `${email}, ${process.env.EMAIL}`,
//     subject: `Registration`,
//     text: `Hello ${fullname} You Have Successfully Registered To Our ECommerce Stor`,
//     html: `<br>Welcome ${fullname} <br/>We're thrilled to have you here. Explore, connect, and enjoy a seamless experience tailored just for you. If you need assistance, our team is here to help. Let's make great things happen together!</b> `,
// });

export const signUp = async (req, res) => {
    const { fullname, email, password } = req.body;
    if (!fullname) return res.status(400).json({ message: "full Name is required" });
    if (!email) return res.status(400).json({ message: "email is required" });
    if (!password) return res.status(400).json({ message: "password is required" });
    try {
        const user = await usersModels.findOne({ email })
        if (user) return res.status(400).json({ message: "user already exits" });

        await usersModels.create({ fullname, email, password });

        res.status(200).json({ message: "user register successfully" })
    } catch (error) {
        res.status(400).json({ message: "error occured" })
        console.log(error);
    }
};

// Login Api 
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.status(400).json({ message: "Email is Required" });
        if (!password) return res.status(400).json({ message: "Password is Required" });

        const user = await usersModels.findOne({ email });
        if (!user) return res.status(404).json({ message: "User Does Not Exists With This Email" });

        const isTruePassword = await bcrypt.compare(password, user.password);
        if (!isTruePassword) return res.status(400).json({ message: "Password Is Incorrect" });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: '/'
        });

        res.status(200).json({
            message: "User Logged In Successfully",
            accessToken,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred during Login" });
    }
}