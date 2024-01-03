// models/quizModel.js
import mongoose  from 'mongoose';

const quizSchema = new mongoose.Schema({
  title: String,
  class: String,
  subject: String,
  startDate: Date,
  startTime: String,
  dueDate: Date,
  dueTime: String,
  publishedBy: String,
  questions: [
    {
      text: String,
      options: [
        { id: String, text: String },
        { id: String, text: String },
        { id: String, text: String },
        { id: String, text: String },
      ],
      correctOption: String,
    },
  ],
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
// module.exports = Quiz;
