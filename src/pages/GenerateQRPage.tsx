import { QRCodeSVG } from "qrcode.react";

const GenerateQRPage = () => {
  const formId = "abc123"; // Hardcoded form ID
  const localURL = `${window.location.origin}/form/${formId}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 to-black text-white p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4">
          Share Patient Form
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Scan the QR code below to open the upload form.
        </p>

        <div className="w-full max-w-xs mx-auto">
          <QRCodeSVG
            value={localURL}
            level="H"
            bgColor="#FFFFFF"
            fgColor="#0f172a"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <a
          href={localURL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 text-xs text-blue-600 hover:underline break-all inline-block"
        >
          {localURL}
        </a>
      </div>
    </div>
  );
};

export default GenerateQRPage;
