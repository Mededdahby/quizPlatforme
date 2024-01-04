import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Quiz from "./model/quiz.js";
import User from "./model/users.js";
import studentAnswers from "./model/studentAnswers.js";
import jwt from "jsonwebtoken";
const secretKey = "your-secret-key";

const app = express();
const uri = "mongodb://127.0.0.1:27017/Quiz";

(async () => {
  await mongoose.connect(uri);
})();

app.use(cors({ origin: true }));
app.use(cors());
app.use(express.json());

app.get("/data", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email: email });

    if (userFound && userFound.password === password) {
      const token = jwt.sign(
        {
          email: userFound.email,
          userId: userFound._id,
          fullname: userFound.fullname,
          role: userFound.role,
        },
        secretKey,
        {
          expiresIn: "1h",
        }
      );
      res.json({ message: "Login successful", token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/studentAnswers", async (req, res) => {
  try {
    console.log(req.body);
    await studentAnswers.create(req.body);
    res.json({ message: "Added successfuly" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/addqcm", async (req, res) => {
  try {
    const newqcm = req.body;
    await Quiz.create(newqcm);
    res.status(200).send({ message: true });
  } catch (error) {
    res.status(500).send({ message: false });
  }
});

app.post("/getUserToken", (req, res) => {
  const token = req.body.token;

  jwt.verify(token, secretKey, (error, userData) => {
    if (error) {
    } else {
      res.send({
        fullname: userData.fullname,
        role: userData.role,
        userId: userData.userId,
      });
    }
  });
});
app.delete("/deleteqcm", async (req, res) => {
  const qcmid = req.body.qcmid;
  await Quiz.deleteOne({ _id: qcmid });
  res.send({ message: true });
});

app.get("/responseById/:id", async (req, res) => {
  const qcms = await studentAnswers.find(
    { userId: req.params.id },
    { quizId: 1, _id: 0 }
  );
  res.send(qcms);
});
app.get("/getresponses", async (req, res) => {
  const responses = await studentAnswers.find();
  res.send(responses);
});

app.listen(5000, () => {
  console.log("Listening at the port : http:/localhost/5000");
});






