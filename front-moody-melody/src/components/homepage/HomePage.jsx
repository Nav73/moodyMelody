import { useEffect, useState } from 'react';

import NavBar from './Homepage Sections/NavBar';
import MainSection from './Homepage Sections/MainSection';
import RightSection from './Homepage Sections/RightSection';
import YouTubePlayer from '../../../Player/musicPlayer';

const baseURL = import.meta.env.VITE_BASE_URL;
console.log('baseURL:', baseURL);
const HomePage = () => {
  const [queue, setQueue] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const playingSongId = YouTubePlayer.getPlayingSongId();
        if (!playingSongId) return;

        const response = await fetch(`${baseURL}/api/current-song/${playingSongId}`);
        if (!response.ok) throw new Error('Failed to fetch song details');

        const videoData = await response.json();
        setCurrentSong({
          title: videoData.title,
          cover: videoData.thumbnail,
        });
      } catch (error) {
        console.error('Error fetching song details:', error);
      }
    };

    fetchSongDetails();
    const interval = setInterval(fetchSongDetails, 1000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await fetch(`${baseURL}/api/queue`);

        if (!response.ok) throw new Error('Failed to fetch queue');
        
        const data = await response.json();
        setQueue(data);
      } catch (error) {
        console.error('Error fetching queue:', error);
      }
    };

    fetchQueue();
  }, []);

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const response = await fetch(`${baseURL}/api/new-releases`);
        if (!response.ok) throw new Error('Failed to fetch new releases');

        const data = await response.json();
        setNewReleases(data);
      } catch (error) {
        console.error('Error fetching new releases:', error);
      }
    };

    fetchNewReleases();
  }, []);

  return (
    <div className="container">
      <NavBar />
      <MainSection newReleases={newReleases} currentSong={currentSong} />
      <RightSection queue={queue} />
      <div id="youtube-player"></div>
    </div>
  );
};

export default HomePage;
