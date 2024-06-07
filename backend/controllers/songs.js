import Song from "../models/Song.js";
import User from "../models/User.js";

import { s3UploadSong } from "../s3Service.js";
import { v4 as uuid } from "uuid";

/* CREATE */
export const createSong = async (req, res) => {
  try {
    const { userId, userName, userPicturePath, title, genre, description, songMp3Path, songPicturePath, likes, comments } = req.body;
    
    const user = await User.findById(userId);

    let songKey = "";
    let pictureKey = "";

    if(req.files){
      songKey = `${uuid()}-${req.files.songMp3Path[0].originalname}`;
      pictureKey = `${uuid()}-${req.files.songPicturePath[0].originalname}`;

      try {
        await s3UploadSong(req.files, songKey, pictureKey);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      
    }
    
    const newSong = new Song({
        userId,
        userName: user.userName,
        userPicturePath: user.profilePicPath,
        title,
        genre,
        description,
        songMp3Path: songKey, 
        songPicturePath: pictureKey,
        likes: {},
        comments: [],
    });

    await newSong.save();
    const song = await Song.find();

    res.status(201).json(song);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedSongs = async (req, res) => {
  try {
    const song = await Song.find();
    res.status(200).json(song);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserSongs = async (req, res) => {
  try {
    const { userId } = req.params;
    const song = await Song.find({ userId });
    res.status(200).json(song);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likeSong = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const song = await Song.findById(id);
    const isLiked = song.likes.get(userId);

    if (isLiked) {
      song.likes.delete(userId);
    } else {
      song.likes.set(userId, true);
    }

    const updatedSong = await Song.findByIdAndUpdate(
      id,
      { likes: song.likes },
      { new: true }
    );

    res.status(200).json(updatedSong);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};