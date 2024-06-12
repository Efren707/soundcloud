import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

import { s3UploadProfilePicture } from "../s3Service.js";
import { v4 as uuid } from "uuid";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      profilePicPath,
      followers,
      following,
      location,
      description,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    let imageKey = "";

    if(req.file){
      imageKey = `${uuid()}-${req.file.originalname}`;

      try {
        await s3UploadProfilePicture(req.file, imageKey);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    const newUser = new User({
      userName,
      email,
      password: passwordHash,
      profilePicPath: imageKey,
      followers,
      following,
      location,
      description,
    });
    
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({token, user});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;    
    const user = await User.findOne({ email: email });
    
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    
    res.status(200).json({ token, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {  
  try {

    if(req.body.password){
      const salt = await bcrypt.genSalt();
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    let imageKey = "";

    if(req.file){
      imageKey = `${uuid()}-${req.file.originalname}`;

      try {
        await s3UploadProfilePicture(req.file, imageKey);
        req.body.profilePicPath = imageKey;
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          location: req.body.location,
          description: req.body.description,
          profilePicPath: req.body.profilePicPath
        }
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}