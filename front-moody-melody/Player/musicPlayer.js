let player; // Global YouTube Player instance

const YouTubePlayer = {
  isPlaying: false,
  volume: 50,
  currentSongId: null,

  loadYouTubeAPI() {
    return new Promise((resolve) => {
      if (window.YT && window.YT.Player) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = resolve;
    });
  },

  async createPlayer() {
    await this.loadYouTubeAPI();

    return new Promise((resolve) => {
      if (!player) {
        player = new window.YT.Player("youtube-player", {
          height: "0",
          width: "0",
          playerVars: { autoplay: 0 },
          events: {
            onReady: resolve,
            onStateChange: async (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                YouTubePlayer.isPlaying = true;
                YouTubePlayer.currentSongId = player.getVideoData().video_id;
              } else {
                YouTubePlayer.isPlaying = false;
              }
            },
          },
        });
      } else {
        resolve();
      }
    });
  },

  async initializePlayer(videoId) {
    await this.createPlayer();
    if (player) {
      player.loadVideoById(videoId);
      player.playVideo();
      YouTubePlayer.isPlaying = true;
      YouTubePlayer.currentSongId = videoId;
    }
  },

  getPlayingSongId() {
    return YouTubePlayer.currentSongId;
  },

  async getVideoDetails(videoId) {
    try {
      const videoInfo = await getSongDetails(videoId);
      if (videoInfo) {
        return {
          title: videoInfo.title,
          channelTitle: videoInfo.author,
          thumbnail: videoInfo.thumbnail,
        };
      } else {
        return { title: "Unknown", channelTitle: "Unknown", thumbnail: "" };
      }
    } catch (error) {
      console.error("Error fetching video details:", error);
      return { title: "Error", channelTitle: "Error", thumbnail: "" };
    }
  },

  play() {
    if (player && !YouTubePlayer.isPlaying) {
      player.playVideo();
      YouTubePlayer.isPlaying = true;
    }
  },

  pause() {
    if (player && YouTubePlayer.isPlaying) {
      player.pauseVideo();
      YouTubePlayer.isPlaying = false;
    }
  },

  togglePlay() {
    if (player) {
      this.isPlaying ? this.pause() : this.play();
    }
  },

  changeVolume(newVolume) {
    if (player) {
      player.setVolume(newVolume);
    }
    YouTubePlayer.volume = newVolume;
  },

  seekTo(seconds) {
    if (player) {
      player.seekTo(seconds, true);
    }
  },

  getCurrentTime() {
    return player ? player.getCurrentTime() : 0;
  },

  getVideoDuration() {
    return player ? player.getDuration() : 1;
  },
};


async function getSongDetails(songId) {
  try {
      // Fetch song info
      const song = await yt.getBasicInfo(songId);

      if (!song || !song.basic_info) {
          console.error("❌ Error: No song data found!");
          return null;
      }

      // 🔹 Extracting Useful Song Details
      const songDetails = {
          id: song.basic_info.id,
          title: song.basic_info.title || "Unknown Title",
          duration: song.basic_info.duration || "Unknown Duration",
          author: song.basic_info.author || "Unknown Artist",
          view_count: song.basic_info.view_count || 0,
          thumbnail: song.basic_info.thumbnail?.[0]?.url || "Unknown Thumbnail",
          url: song.basic_info.url_canonical || `https://www.youtube.com/watch?v=${songId}`
      };

      return songDetails;
  } catch (error) {
      console.error("❌ Error fetching song details:", error);
      return null;
  }
}


export default YouTubePlayer;
