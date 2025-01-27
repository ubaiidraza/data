import express from "express";
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import connectDb from "./src/db/index.js";
import userrouters from "./src/routes/user.routers.js"
import cookieParser from "cookie-parser";



const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {   
    res.send("Hello World!")
})

app.use("/api/v1", userrouters);

// MONGO DB and Server connection
connectDb().then(() => {
app.listen(process.env.PORT, () => {
    console.log(`Server is running at port : ${process.env.PORT}`);
})
}).catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
})