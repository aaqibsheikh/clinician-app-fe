import React, { useEffect, useRef, useState } from 'react';

const StepVoiceNote = ({
  audio,
  setAudio,
  onNext,
  onBack,
}: {
  audio: Blob | null;
  setAudio: (blob: Blob | null) => void;
  onNext: () => void;
  onBack: () => void;
}) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<any | null>(null);
  const chunks: Blob[] = [];

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
    setSeconds(0);
    chunks.length = 0;
    setAudio(null);
    setPreviewUrl(null);

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      setAudio(blob);
      setPreviewUrl(URL.createObjectURL(blob));
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    mediaRecorder.start();

    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  const resetRecording = () => {
    setAudio(null);
    setPreviewUrl(null);
    setSeconds(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-700">Record Your Voice Note 🎙️</h2>

      {/* Recording Indicator */}
      {isRecording && (
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 bg-red-600 rounded-full animate-ping"></div>
          <p className="text-red-600 font-medium">Recording... {seconds}s</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-4">
        {!isRecording && !audio && (
          <button
            onClick={startRecording}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
          >
            Start Recording
          </button>
        )}

        {isRecording && (
          <button
            onClick={stopRecording}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
          >
            Stop Recording
          </button>
        )}

        {!isRecording && audio && (
          <button
            onClick={resetRecording}
            className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md transition"
          >
            Remove Recording
          </button>
        )}
      </div>

      {/* Audio Preview */}
      {previewUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-1">Preview:</p>
          <audio controls src={previewUrl} className="w-full rounded shadow" />
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="bg-gray-200 px-4 py-2 rounded">
          Back
        </button>
        <button
          onClick={onNext}
          disabled={isRecording}
          className={`px-4 py-2 rounded text-white ${
            isRecording
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepVoiceNote;
