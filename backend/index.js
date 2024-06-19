import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { register, updateUser } from "./controllers/auth.js"
import { createSong } from "./controllers/songs.js";
import { verifyToken } from "./middleware/auth.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import songRoutes from "./routes/songs.js"

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* FILE STORAGE */
const storage = multer.memoryStorage();

/* S3 UPLOAD */
const profileFileFilter = (req, file, cb) => {
    if(file.mimetype.split("/")[0] === 'image'){
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
}

const uploadProfilePic = multer({ 
    storage, 
    profileFileFilter, 
    limits: { fileSize: 100000000, files: 1 } 
})


const songFileFilter = (req, file, cb) => {
    
    if(file.fieldname === "mp3URL" && file.mimetype.split("/")[0] === 'audio'){
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }

    if(file.fieldname === "imageURL" && file.mimetype.split("/")[0] === 'image'){
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
}

const uploadSongMp3Pic = multer({
    storage,
    songFileFilter, 
    limits: {files: 2, fileSize: 1000000000}
})


/* ROUTES WITH FILES */
app.post("/auth/register", uploadProfilePic.single("profileURL", 1), register);
app.patch("/update/:id", uploadProfilePic.single("profileURL", 1), verifyToken, updateUser);

app.post("/songs", uploadSongMp3Pic.fields([
    {name: 'mp3URL', maxCount: 1},
    {name: 'imageURL', maxCount: 1},
]), verifyToken, createSong);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/songs", songRoutes);

/* ERROR HANDLING */
app.use((error, req, res, next) => {

    if(error instanceof multer.MulterError){
        if(error.code === "LIMIT_FILE_SIZE"){
            return res.status(400).json({
                message: "File is too large"
            })
        }

        if(error.code === "LIMIT_FILE_COUNT"){
            return res.status(400).json({
                message: "Only upload 1 file"
            })
        }

        if(error.code === "LIMIT_UNEXPECTED_FILE"){
            return res.status(400).json({
                message: "File must be in JPEG or PNG format"
            })
        }
    }
})

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));