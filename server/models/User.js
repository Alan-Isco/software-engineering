import mongoose from "mongoose";

/**
 * UserSchema defines the schema for User documents in MongoDB.
 *
 * It specifies the fields, data types, validators, etc. for the User model.
 * The schema maps to a User collection in MongoDB.
 *
 * The schema defines fields like firstName, lastName, email, password,
 * guest type, and profile information. Required fields, data types,
 * and validators are set for each field.
 */
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    guest: {
      type: String,
      enum: ["client", "freelancer", "organization"],
      required: true,
    },
    profile: [
      {
        profilePic: String,
        location: String,
        activeHours: Number,
        statusFinished: {
          type: Boolean,
          default: false
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
