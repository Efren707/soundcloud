import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const followers = await Promise.all(
      user.followers.map((id) => User.findById(id))
    );
    const formattedFollowers = followers.map(
      ({ _id, userName, profilePicPath }) => {
        return { _id, userName, profilePicPath };
      }
    );
    res.status(200).json(formattedFollowers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const following = await Promise.all(
      user.following.map((id) => User.findById(id))
    );
    const formattedFollowing = following.map(
      ({ _id, userName, profilePicPath }) => {
        return { _id, userName, profilePicPath };
      }
    );
    res.status(200).json(formattedFollowing);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFollow = async (req, res) => {
  try {
    const { id, followId } = req.params;
    const user = await User.findById(id);
    const followee = await User.findById(followId);

    if (user.following.includes(followId)) {
      user.following = user.following.filter((id) => id !== followId);
      followee.followers = followee.followers.filter((id) => id !== id);
    } else {
      user.following.push(followId);
      followee.followers.push(id);
    }
    
    await user.save();
    await followee.save();

    const followingList = await Promise.all(
      user.following.map((id) => User.findById(id))
    );

    const formattedFollowing = followingList.map(
      ({ _id, userName, profilePicPath }) => {
        return { _id, userName, profilePicPath };
      }
    );

    res.status(200).json(formattedFollowing);

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};