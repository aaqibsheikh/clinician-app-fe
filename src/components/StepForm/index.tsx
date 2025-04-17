// Updated StepForm/index.tsx with slight enhancements
import React, { useState } from "react";
import StepInstructions from "./StepInstructions";
import StepPhotoUpload from "./StepPhotoUpload";
import StepVoiceNote from "./StepVoiceNote";
import StepSubmit from "./StepSubmit";

const StepForm = ({ formId }: { formId?: string }) => {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<File[]>([]);
  const [audio, setAudio] = useState<Blob | null>(null);
  console.log("Form ID:", formId);

  const resetForm = () => {
    setStep(1);
    setPhotos([]);
    setAudio(null);
  };

  return (
    <div className="space-y-6">
      {step === 1 && <StepInstructions onNext={() => setStep(2)} />}
      {step === 2 && (
        <StepPhotoUpload
          photos={photos}
          setPhotos={setPhotos}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <StepVoiceNote
          audio={audio}
          setAudio={setAudio}
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <StepSubmit
          photos={photos}
          audio={audio}
          formId={formId}
          onBack={() => setStep(3)}
          resetForm={resetForm}
        />
      )}
    </div>
  );
};

export default StepForm;
