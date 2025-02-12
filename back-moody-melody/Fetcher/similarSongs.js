
//not completed yet


import { YTMusic } from 'ytmusic-api';

const ytMusic = new YTMusic();

const getRelatedSongs = async (query) => {
    try {
        const searchResults = await ytMusic.search(query, 'songs');
        const relatedSongs = searchResults
            .filter(item => item.type === 'song' && item.title && item.artists)
            .map(item => ({
                title: item.title,
                artist: item.artists.map(artist => artist.name).join(', ')
            }));

        console.log("Related Songs:", relatedSongs);
        return relatedSongs;
    } catch (error) {
        console.error("Error occurred while fetching related songs:", error);
        throw error;
    }
}

// Example: Finding related songs for "Ariana Grande - positions"
getRelatedSongs("Ariana Grande - positions");