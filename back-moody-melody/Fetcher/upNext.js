import { Innertube, UniversalCache } from 'youtubei.js';

const yt = await Innertube.create({ cache: new UniversalCache(true) });



async function getPlaylist(playlistId) {
    try {
            let allTracks = [];
            const playlist = await yt.music.getPlaylist(playlistId);

            if (!playlist || !playlist.contents || playlist.contents.length === 0) {
                console.error("❌ Error: No playlist data found!");
            } 

            // 🔹 Extracting Tracks and Additional Details
            const tracks = playlist.contents.slice(0, 5).map(track => {
                const trackDetails = {
                    songId: track.id || "Unknown Video ID",
                    title: track.title || "Unknown Title",
                    duration: track.duration?.text || "Unknown Duration",
                    artists: track.authors?.map(author => author.name).join(", ") || track.artists?.map(artist => artist.name).join(", ") || "Unknown Author",
                    image: track.thumbnail.contents[0].url || "Unknown Image", // Thumbnail URL
                };
                return trackDetails;
            });
            

            // 🔹 Adding tracks from current page to allTracks
            allTracks.push(...tracks);
        return allTracks;
    } catch (error) {
        console.error("❌ Error fetching playlist:", error);
    }
}

export { getPlaylist }

// getPlaylist('PLGpLqaMxppFp05ujpCXMpwwTociDcIF53');