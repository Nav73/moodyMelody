import os
from flask import Flask, jsonify
import cv2
import time
from deepface import DeepFace
from collections import Counter

app = Flask(__name__)

# Directory for storing logs
log_dir = "emotionDetection"
os.makedirs(log_dir, exist_ok=True)

log_file = os.path.join(log_dir, "emotions_log.txt")
summary_file = os.path.join(log_dir, "most_frequent_emotion.txt")

def detect_emotions():
    cap = cv2.VideoCapture(0)

    # Clear previous logs
    with open(log_file, "w") as file:
        file.write("")
    with open(summary_file, "w") as file:
        file.write("")
    
    emotions_list = []
    start_time = time.time()

    while len(emotions_list) < 30:  # Capture 30 emotions
        if time.time() - start_time >= 2 * len(emotions_list):  # Capture every 2 seconds
            ret, frame = cap.read()
            if not ret:
                print("Failed to capture frame.")
                break
            
            try:
                analysis = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
                emotion = analysis[0]['dominant_emotion']
                emotions_list.append(emotion)
                
                with open(log_file, "a") as file:
                    file.write(emotion + "\n")
                    file.flush()
                
                print(f"Detected Emotion: {emotion}")  # Print to console

            except Exception as e:
                print("Error detecting emotion:", e)
                continue
    
    cap.release()
    analyze_emotions()

def analyze_emotions():
    """Reads emotions_log.txt, finds the most frequent emotion, and writes it to a new file."""
    if not os.path.exists(log_file):
        print("No log file found to analyze.")
        return

    with open(log_file, "r") as file:
        emotions = file.read().splitlines()

    if not emotions:
        print("Log file is empty.")
        return

    # Count occurrences of each emotion
    emotion_counts = Counter(emotions)
    most_frequent_emotion = max(emotion_counts, key=emotion_counts.get)

    # Write the most frequent emotion to a new file
    with open(summary_file, "w") as file:
        file.write(f"Most Frequent Emotion: {most_frequent_emotion} ({emotion_counts[most_frequent_emotion]} times)\n")

    print(f"Most Frequent Emotion: {most_frequent_emotion} ({emotion_counts[most_frequent_emotion]} times)")

# 🟢 API Endpoint to get the most frequent emotion
@app.route('/get_most_frequent_emotion', methods=['GET'])
def get_most_frequent_emotion():
    """Returns the most frequent emotion as JSON"""
    if not os.path.exists(summary_file):
        return jsonify({"error": "No data available. Run detection first."}), 404
    
    with open(summary_file, "r") as file:
        result = file.read().strip()

    if not result:
        return jsonify({"error": "No emotions recorded."}), 404

    return jsonify({"most_frequent_emotion": result})

def run_emotion_detection():
    detect_emotions()

if __name__ == '__main__':
    run_emotion_detection()
    app.run(debug=True)
