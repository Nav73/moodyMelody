import cv2
import requests
from deepface import DeepFace
from collections import Counter
import time

# Backend API endpoint
BACKEND_URL = "http://localhost:3000/detect-emotion"

# Initialize webcam
cap = cv2.VideoCapture(0)

emotion_history = []  # Store detected emotions during a song
song_duration = 30  # Assume each song plays for 30 seconds
detection_interval = 1.2  # 50 detections per minute = 1 detection every 1.2 seconds

start_time = time.time()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    try:
        # Detect emotions every 1.2 seconds
        analysis = DeepFace.analyze(frame, actions=['emotion'])
        emotion = analysis[0]['dominant_emotion']
        emotion_history.append(emotion)

        print(f"Detected Emotion: {emotion}")

        # Send emotion to backend
        requests.post(BACKEND_URL, json={"emotion": emotion})

    except Exception as e:
        print(f"Error: {e}")

    # Check if song duration has passed
    if time.time() - start_time > song_duration:
        # Find the most frequent emotion
        most_common_emotion = Counter(emotion_history).most_common(1)[0][0]
        print(f"Most Common Emotion: {most_common_emotion}")

        # Send the dominant emotion to backend
        requests.post(BACKEND_URL + "/final-emotion", json={"emotion": most_common_emotion})

        # Reset emotion history for next song
        emotion_history = []
        start_time = time.time()  # Reset timer

    # Wait 1.2 seconds before next detection
    time.sleep(detection_interval)

    cv2.imshow("Emotion Detection", frame)

    # Exit on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
