import { useState, useEffect, useCallback } from "react";
import '../HomePage.css';
import PropTypes from 'prop-types';
import YouTubePlayer from '../../../../Player/musicPlayer';

function MainSection({ newReleases, currentSong }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [duration, setDuration] = useState(1);

  const formatTime = (timeInSeconds) => {
    const minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, '0');
    const seconds = String(Math.floor(timeInSeconds % 60)).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const updateTime = useCallback(() => {
    if (YouTubePlayer.isPlaying) {
      setCurrentTime(YouTubePlayer.getCurrentTime());
      setDuration(YouTubePlayer.getVideoDuration());
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [updateTime]);

  const playPause = useCallback(() => {
    YouTubePlayer.togglePlay();
  }, []);

  const handleSeek = useCallback(() => {
    const seconds = parseInt(seekTime, 10);
    if (!isNaN(seconds) && seconds >= 0 && seconds <= duration) {
      YouTubePlayer.seekTo(seconds);
    }
  }, [seekTime, duration]);

  return (
    <main className="main-content">
      <div className="player">
        <div className="vinyl">
          <div className="vinyl-cover">
            <img src={currentSong?.cover || "/default-cover.jpg"} alt="Album Cover" />
          </div>
        </div>
        <div className="track-info">
          <h1>{currentSong?.title || "Unknown Title"}</h1>
          <div className="controls">
            <button id="previousBtn" className="control-btn" aria-label="Previous Track">
              &#9664;
            </button>
            <button id="pause-playBtn" className="pause-play-btn" onClick={playPause} aria-label="Play/Pause">
              &#9654;
            </button>
            <button id="nextBtn" className="control-btn" aria-label="Next Track">
              &#9654;&#9654;
            </button>
          </div>
          <div className="progress-bar">
            <span>{formatTime(currentTime)}</span>
            <div className="progress">
              <div className="progress-fill" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
            </div>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="seek-controls">
            <input
              type="number"
              value={seekTime}
              onChange={(e) => setSeekTime(e.target.value)}
              placeholder="Enter seconds"
              min="0"
              max={duration}
            />
            <button onClick={handleSeek}>Seek</button>
          </div>
        </div>
      </div>
      <div className="recommendations">
        <div className="section">
          <h2>New Releases</h2>
          <ul>
            {newReleases.map((song) => (
              <li key={song.songId} className="new-release-item" onClick={() => YouTubePlayer.initializePlayer(song.songId)}>
                <img src={song.image} alt={song.title} />
                <span>{song.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

MainSection.propTypes = {
  newReleases: PropTypes.arrayOf(
    PropTypes.shape({
      songId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired,
  currentSong: PropTypes.shape({
    cover: PropTypes.string,
    title: PropTypes.string,
  })
};

export default MainSection;
