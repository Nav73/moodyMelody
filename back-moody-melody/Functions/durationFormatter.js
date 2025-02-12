export default function formatDuration(duration_ms) {
    const seconds = Math.floor(duration_ms / 1000);  // Convert milliseconds to seconds
    const minutes = Math.floor(seconds / 60);  // Get the minutes
    const remainingSeconds = seconds % 60;  // Get the remaining seconds
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;  // Format as MM:SS
}