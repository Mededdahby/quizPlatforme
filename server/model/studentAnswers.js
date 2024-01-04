// models/quizModel.js
import mongoose from "mongoose";

const studentScele = new mongoose.Schema({
  quizId: String,
  userId: String,
  scor: String,
  answers: {},
  fullname: String,
  quiztitle: String
});

const userAnswer = mongoose.model("UserAnswer", studentScele);

export default userAnswer;
