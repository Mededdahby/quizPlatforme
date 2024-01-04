// models/quizModel.js
import mongoose from "mongoose";

const studentScele = new mongoose.Schema({
  quizId: String,
  userId: String,
  score: Number,
  answers: {},
  fullname: String,
  quiztitle: String
});

const userAnswer = mongoose.model("UserAnswer", studentScele);

export default userAnswer;
