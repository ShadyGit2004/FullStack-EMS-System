import express from "express";
import cors from "cors";
import "dotenv/config";
import multer  from "multer";

import connectDB from "./config/db.js"

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(multer().none());

app.get("/",(req, res)=>{
    res.send("Welcome home")
});

connectDB();

app.listen(PORT, ()=>{
    console.log("Server is listening to port", PORT);
});