// models/quizModel.js
import mongoose from "mongoose";

const user = new mongoose.Schema({
  email:  String ,
  password: String,
  role: String,
  fullname: String,
});

const User = mongoose.model("User", user);

export default User;
