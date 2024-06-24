import mongoose from "mongoose";

const songSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    userPicturePath: String,
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 100,
    },
    caption: {
      type: String,
      max: 100,
    },
    mp3URL: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    playCount: {
      type: Number,
      required: true,
      default: 0
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Song = mongoose.model("Song", songSchema);

export default Song;
