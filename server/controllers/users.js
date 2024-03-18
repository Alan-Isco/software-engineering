import mongoose from "mongoose";
import User from "../models/User.js";

// GET ALL USERS WITH THEIR INFO
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// GET ALL USERS WITH THEIR INFO
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ error: "No such user" });

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE THE PROFILES OF USERS
export const editProfile = async (req, res) => {
  try {
    const { id } = req.params;
    req.body._id = id;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ error: "No such profile" });

    const updatedProfileFields = {};
    for (const key in req.body) {
      if (key !== "_id") {
        updatedProfileFields[`profile.$.${key}`] = req.body[key];
      }
    }

    const updatedProfile = await User.findOneAndUpdate(
      { "profile._id": id },
      {
        $set: updatedProfileFields,
      },
      { new: true }
    );
    if (!updatedProfile)
      return res.status(404).json({ error: "Profile not found" });
    res.status(200).json(updatedProfile);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
