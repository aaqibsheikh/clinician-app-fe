import React, { useRef, useState } from "react";
import { toast } from 'react-toastify';

const MAX_FILES = 10;
const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf"
];

const StepPhotoUpload = ({
  photos,
  setPhotos,
  onNext,
  onBack
}: {
  photos: File[];
  setPhotos: (files: File[]) => void;
  onNext: () => void;
  onBack: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFiles = (files: FileList | File[]) => {
    const validFiles: File[] = [];

    const remainingSlots = MAX_FILES - photos.length;
    if (files.length > remainingSlots) {
        toast.error(`You can only upload ${remainingSlots} more file(s). Max allowed: ${MAX_FILES}`, {
            position: 'top-center',
          });
          
      return [];
    }

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(`Invalid file type: ${file.name}`, {
            position: 'top-center',
          });
        continue;
      }

      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        toast.error(`File too large (${fileSizeMB.toFixed(2)} MB): ${file.name}`, {
            position: 'top-center',
          });
          
        continue;
      }

      validFiles.push(file);
    }

    return validFiles;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = validateFiles(e.target.files);
      setPhotos([...photos, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const validFiles = validateFiles(files);
    setPhotos([...photos, ...validFiles]);
  };

  const handleRemove = (index: number) => {
    const updated = [...photos];
    updated.splice(index, 1);
    setPhotos(updated);
  };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Upload Patient Files or Photos</h2>

      {/* Drag & Drop Zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        } cursor-pointer`}
      >
        <p className="text-gray-600">
          Drag & drop image or document files here, or click to upload (Max 5MB
          each)
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ALLOWED_TYPES.join(",")}
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {/* Previews */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((file, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-sm"
          >
            {file.type.startsWith("image") ? (
              <img
                src={URL.createObjectURL(file)}
                alt={`upload-${index}`}
                className="w-full h-40 object-cover"
              />
            ) : (
              <div className="flex items-center justify-center bg-gray-100 h-40 text-sm text-gray-600">
                📄 {file.name}
              </div>
            )}
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <button
          onClick={onBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={photos.length < 1}
          className={`px-4 py-2 rounded text-white ${
            photos.length < 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepPhotoUpload;
