import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
      min: 3,
      max: 50,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    firstName: {
      type: String,
      min: 1,
      max: 50,
    },
    lastName: {
      type: String,
      min: 1,
      max: 50,
    },
    profileURL: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    city: String,
    country: String,
    bio: {
      type: String,
      max: 150,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
