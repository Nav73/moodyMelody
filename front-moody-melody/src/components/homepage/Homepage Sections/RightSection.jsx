import PropTypes from 'prop-types';
import '../HomePage.css'; 
import YouTubePlayer from '../../../../Player/musicPlayer'; 

const RightSection = ({ queue }) => {
  const handleSongClick = async (songId) => {
    try {
      await YouTubePlayer.initializePlayer(songId);
    } catch (error) {
      console.error("Error occurred while initializing YouTube player:", error);
    }
  };

  return (
    <aside className="right-section">
      <div className="up-next">
        <h2>Up Next</h2>
        <ul>
          {queue.map((item) => (
            <li key={item.songId} className="album-item" onClick={() => handleSongClick(item.songId)}>
              <img src={item.image} alt={item.title} className="album-image" />
              <div className="album-details">
                <span className="album-title">{item.title}</span>
                <span className="album-duration">{item.duration}</span>
                <br />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div id="youtube-player"></div> {/* This div is required for the YouTube player */}
    </aside>
  );
};

RightSection.propTypes = {
  queue: PropTypes.arrayOf(
    PropTypes.shape({
      songId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
    })
  ).isRequired
};

export default RightSection;