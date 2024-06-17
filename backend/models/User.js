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
      max: 50,
      default: "",
    },
    lastName: {
      type: String,
      max: 50,
      default: "",
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
    city: {
      type: String,
      max: 50,
      default: "",
    },
    country: {
      type: String,
      max: 50,
      default: "",
    },
    bio: {
      type: String,
      max: 150,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
