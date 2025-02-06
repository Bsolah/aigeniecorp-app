import React, { useEffect, useRef, useState } from 'react';
import { FaMicrophone, FaStop, FaTimes, FaTrash } from 'react-icons/fa';

interface VoiceRecorderProps {
  onRecording?: () => void;
  onRecordingStop?: any;
  onClose?: () => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onRecording, onRecordingStop, onClose }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);
  const [data, setData] = useState<any>();
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        audioChunksRef.current = [];

        // Convert to FormData
        // const formData = new FormData();
        // formData.append('audio', audioBlob, 'recording.wav');
        // formData.append('duration', duration.toString());
        setData(audioBlob);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setDuration(0);
      onRecording && onRecording();

      recordingIntervalRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }

    // Stop all tracks to release microphone
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    onRecordingStop && onRecordingStop(data);
  };

  const resetRecorder = () => {
    setRecording(false);
    setAudioURL(null);
    setDuration(0);
    stopRecording();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex items-center p-3 bg-[#E5E7EB] rounded-md shadow-md w-full mt-2 ">
      {!audioURL ? (
        <div className="flex items-center justify-between w-full">
          <div>
            {recording ? <span>{formatDuration(duration)}</span> : <p>Start Recording ...</p>}
          </div>

          {recording && (
            <span className="text-red-600 font-bold mr-2 animate-pulse">Recording...</span>
          )}

          <div className="flex items-center gap-2">
            {/* Close Button */}
            {!recording && (
              <button
                onClick={() => {
                  onClose && onClose();
                  resetRecorder();
                }}
                className="p-3 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition"
              >
                <FaTimes size={16} />
              </button>
            )}

            {/* Start/Stop Button */}
            <button
              onClick={recording ? stopRecording : startRecording}
              className={`p-3 rounded-full text-white flex items-center justify-center transition ${
                recording ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400'
              }`}
            >
              {recording ? <FaStop size={20} /> : <FaMicrophone size={20} />}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center w-full justify-between">
          <audio controls className="mr-2 w-[100%] rounded-md">
            <source src={audioURL} type="audio/wav" />
          </audio>
          <button onClick={resetRecorder} className="text-red-500 mr-2">
            <FaTrash size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
