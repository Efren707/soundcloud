import Song from "../models/Song.js";
import User from "../models/User.js";

import { s3UploadSong } from "../s3Service.js";
import { v4 as uuid } from "uuid";

/* CREATE */
export const createSong = async (req, res) => {
  try {
    const { 
      userId, 
      displayName, 
      userPicturePath, 
      title, 
      genre, 
      description, 
      caption,
      mp3URL, 
      imageURL, 
      playCount,
      likes, 
      comments 
    } = req.body;
    
    const user = await User.findById(userId);

    let songKey = "";
    let pictureKey = "";

    if(req.files){
      songKey = `${uuid()}-${req.files.mp3URL[0].originalname}`;
      pictureKey = `${uuid()}-${req.files.imageURL[0].originalname}`;

      try {
        await s3UploadSong(req.files, songKey, pictureKey);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      
    }
  
    const newSong = new Song({
      userId,
      displayName: user.displayName,
      userPicturePath: user.profileURL,
      title,
      genre,
      description,
      caption,
      mp3URL: songKey, 
      imageURL: pictureKey,
      playCount,
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

export const getSong = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findById( id );
    res.status(200).json(song);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const updateSong = async (req, res) => {  
  try {
    let songKey = "";
    let pictureKey = "";

    if(Object.keys(req.files).length > 0){

      songKey = `${uuid()}-${req.files.mp3URL[0].originalname}`;
      pictureKey = `${uuid()}-${req.files.imageURL[0].originalname}`;

      try {
        await s3UploadSong(req.files, songKey, pictureKey);
        req.body.mp3URL = songKey;
        req.body.imageURL = pictureKey;
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      
    }

    const { id } = req.params;

    const updatedSong = await Song.findByIdAndUpdate(
      id,
      {
        $set: {
          userId: req.body.userId, 
          displayName: req.body.displayName, 
          userPicturePath: req.body.userPicturePath, 
          title: req.body.title, 
          genre: req.body.genre, 
          description: req.body.description, 
          caption: req.body.caption,
          mp3URL: req.body.mp3URL, 
          imageURL: req.body.imageURL, 
          playCount: req.body.playCount,
          likes: req.body.likes, 
          comments: req.body.comments 
        },
      },
      { new: true }
    );

    res.status(200).json(updatedSong);

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}


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

export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSong = await Song.deleteOne({ id });

    res.status(200).json(id);

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}