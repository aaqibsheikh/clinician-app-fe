import React from 'react';

const StepInstructions = ({ onNext }: { onNext: () => void }) => (
  <div className="space-y-6 text-center">
    <h2 className="text-3xl font-extrabold text-blue-700 animate-fade-in">
      Let’s Begin Documentation 📝
    </h2>
    <p className="text-md text-gray-600">
      You’ll be guided step-by-step to capture patient photos and record a short narrative if needed. Please make sure images are clear and voice notes are concise — your input helps ensure accurate care.
    </p>
    <button
      onClick={onNext}
      className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-500 hover:opacity-90 text-white px-6 py-3 rounded-lg w-full font-medium transition"
    >
      Start Capturing
    </button>
  </div>
);

export default StepInstructions;
