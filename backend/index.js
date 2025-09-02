import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import pinRoutes from "./routes/pinRoutes.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import path from 'path';
const app=express();
dotenv.config();
cloudinary.v2.config({
    cloud_name:process.env.Cloud_Name,
    api_key:process.env.Cloud_API,
    api_secret:process.env.Cloud_Secret,
});
connectDB();
app.use(express.json());
app.use(cookieParser());
const port=process.env.PORT;
const __dirname=path.resolve();

app.use("/api/user",userRoutes);
app.use("/api/pin",pinRoutes);
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});