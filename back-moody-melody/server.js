// import dotenv from "dotenv";
// dotenv.config();

// import express, { json } from "express";
// import cors from "cors";
// import router from "./Routes/routes.js";

// const app = express();
// // const port = process.env.port || 3000;

// app.use(cors());
// app.use(json());
// app.use(router);

/*Ankit code**************************************************************************************************************/
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import router from "./Routes/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(cors());
app.use(cors({
  origin: "http://localhost:5173", // Allow frontend
  methods: "GET,POST",
  allowedHeaders: "Content-Type"
}));

app.use(express.json());
app.use(router);

const songsDirectory = path.join(process.cwd(), "songs");

const emotionToFolder = {
  happy: "happy",
  sad: "sad",
  angry: "angry",
  neutral: "calm",
  fear: "relaxing",
  surprise: "exciting",
  disgust: "disgusted",
};

let currentEmotion = "neutral"; // Default emotion

app.post("/detect-emotion", (req, res) => {
  console.log("Detected Emotion:", req.body.emotion);
  res.sendStatus(200);
});

app.post("/final-emotion", (req, res) => {
  currentEmotion = req.body.emotion;
  console.log("Final Emotion for Next Song:", currentEmotion);
  res.sendStatus(200);
});

app.get("/get-song", (req, res) => {
  const emotionFolder = emotionToFolder[currentEmotion] || "calm";
  const folderPath = path.join(songsDirectory, emotionFolder);

  console.log(`🎭 Detected Emotion: ${currentEmotion}`);
  console.log(`📁 Checking Folder: ${folderPath}`);

  fs.readdir(folderPath, (err, files) => {
    if (err || !files.length) {
      console.error(`❌ No songs found in: ${folderPath}`);
      return res.json({ song: "default.mp3" });
    }

    const randomSong = files[Math.floor(Math.random() * files.length)];
    console.log(`🎵 Playing: ${randomSong} from ${emotionFolder}`);
    res.json({ song: `${emotionFolder}/${randomSong}` });
  });
});


app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; media-src 'self' http://localhost:3000");
  next();
});


// Serve static files (songs)
app.use("/songs", express.static(songsDirectory));

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

/********************************************************************************************************************* */

// app.listen(port, () => {
//     console.log(`Backend server is running at http://localhost:${port}`);
// });
