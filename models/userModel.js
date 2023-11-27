
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  hosteltype: {
    type: String,
    required: [true, "Hostel type is required"],
    enum: ["boys", "girls"],
  },
  yearStudying: {
    type: String,
    required: [true, "Year Studying is required"],
    enum: ["FE", "SE", "TE"],
  },
  roomNo: {
    type: String,
    required: [true, "Room no is required"],
    validate: {
      validator: async function (roomNo) {
        // Check if there are already two users with the same room number
        const existingUsers = await this.constructor.find({ roomNo });
        return existingUsers.length < 2;
      },
      message: "Only two users can have the same room number",
    },
  },
 
  isAdmin: {
    type: Boolean,
    default: false,
  },
  notification: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
});


const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
