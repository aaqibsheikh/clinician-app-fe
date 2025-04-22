import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const StepSubmit = ({
  photos,
  audio,
  formId,
  onBack,
  resetForm
}: {
  photos: File[];
  audio: Blob | null;
  formId?: string;
  onBack: () => void;
  resetForm: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);
    const formData = new FormData();

    const clinicianName = localStorage.getItem("clinicianName");
    formData.append("clinicianName", clinicianName || "");

    photos.forEach((photo) => formData.append("photos", photo));
    if (audio) {
      formData.append("audio", audio, "voice.webm");
    }
    if (formId) {
      formData.append("formId", formId);
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      toast.success("All done! Your submission has been safely uploaded.", {
        position: "top-center"
      });
      resetForm();
    } catch (err) {
      toast.error("Upload failed. Please try again.", {
        position: "top-center"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-700">Review & Submit 🧾</h2>

      <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200 space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-green-600">✅</span>
          <span>{photos.length} photo(s) selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={audio ? "text-green-600" : "text-yellow-500"}>
            {audio ? "✅" : "⚠️"}
          </span>
          <span>{audio ? "Voice note recorded" : "No voice note added"}</span>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          disabled={loading}
          className={`bg-gray-200 px-4 py-2 rounded transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
          }`}
        >
          Back
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`flex items-center justify-center gap-2 px-6 py-2 rounded text-white transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <>
              <ClipLoader color="#fff" size={20} />
              Uploading...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};

export default StepSubmit;
