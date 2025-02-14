import express from 'express';
import { getPlaylist } from '../Fetcher/upNext.js';
import { getNewReleases } from '../Fetcher/newReleases.js';
import { getSongDetails } from '../Fetcher/songById.js';

const router = express.Router();

router.get('/api/queue', async (req, res) => { 
    try {
        const playlistId = 'PLafSq5UblCNWzrBiEOwBeIdoU8AFXfTqp'; // Example playlist ID
        const tracks = await getPlaylist(playlistId);
        res.json(tracks);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch playlist details from Spotify' });
    }
});

router.get('/api/new-releases', async (req, res) => {
    try {
        const playlistId = 'RDCLAK5uy_ksEjgm3H_7zOJ_RHzRjN1wY-_FFcs7aAU'; // Example playlist ID
        const tracks = await getNewReleases(playlistId);
        res.json(tracks);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch playlist details from Spotify' });
    }
});

router.get('/api/current-song/:id', async (req, res) => {
    try {
        const track = await getSongDetails(req.params.id);
        res.json(track);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch track details from Spotify' });
    }
});

export default router;