import { useState } from "react";

const StepInstructions = ({ onNext }: { onNext: () => void }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const handleStart = () => {
    if (!name.trim()) {
      setError(true);
      return;
    }

    setError(false);
    localStorage.setItem("clinicianName", name.trim());
    onNext();
  };

  return (
    <div className="space-y-6 text-center">
      <div className="mb-6 text-center space-y-2">
        <h1 className="text-2xl font-bold text-blue-700">ZenAI 485</h1>
        <p className="text-sm text-gray-600">
          A guided form to help clinicians upload patient photos and record
          voice notes with ease.
        </p>
      </div>

      <div className="space-y-1">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(false);
          }}
          placeholder="Enter your name"
          className={`w-full border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 ring-red-300"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {error && (
          <p className="text-sm text-red-500">Clinician name is required.</p>
        )}
      </div>

      <button
        onClick={handleStart}
        disabled={!name.trim()}
        className={`w-full px-6 cursor-pointer py-3 rounded-lg font-medium transition text-white ${
          !name.trim()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-indigo-500 hover:opacity-90"
        }`}
      >
        Start Capturing
      </button>
    </div>
  );
};

export default StepInstructions;
