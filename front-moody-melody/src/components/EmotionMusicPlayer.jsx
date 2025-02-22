import React, { useState, useEffect } from "react";
import axios from "axios";

const EmotionMusicPlayer = () => {
  const [song, setSong] = useState("");

  useEffect(() => {
    fetchSong();
  }, []);

  // 🎵 Fetch song from backend
  const fetchSong = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get-song");
      
      const songPath = response.data.song;
      console.log("Now Playing URL:", `http://localhost:3000/songs/${songPath}`);
      const formattedSongPath = songPath.startsWith("/") ? songPath.substring(1) : songPath;
      setSong(`http://localhost:3000/songs/${formattedSongPath}`);
            

    } catch (error) {
      console.error("❌ Error fetching song:", error);
    }
  };

  return (
    <div>
      <h2>🎶 Emotion-Based Music Player</h2>
      {song ? (
        <audio src={song} controls autoPlay onEnded={fetchSong} />
      ) : (
        <p>🎵 No song detected yet.</p>
      )}
    </div>
  );
};

export default EmotionMusicPlayer;
