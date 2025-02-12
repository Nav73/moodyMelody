import { Innertube, UniversalCache } from 'youtubei.js';

// Initialize YouTube API
const yt = await Innertube.create({ cache: new UniversalCache(true) });

/**
 * Fetch song details using the song ID.
 * @param {string} songId - The ID of the song.
 * @returns {object} - Song details (title, artist, duration, thumbnail, etc.).
 */
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

export { getSongDetails };

// Example Usage:
getSongDetails('lBvbNxiVmZA')



