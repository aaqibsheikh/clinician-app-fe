import { QRCodeSVG } from "qrcode.react";
import { v4 as uuidv4 } from "uuid";

const GenerateQRPage = () => {
  const formId = uuidv4(); // Generate unique ID
  const localURL = `${window.location.origin}/form/${formId}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 to-black text-white p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4">
          Share Patient Form
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Scan the QR code below to open a unique upload form. This link is
          specific to this session.
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

        <p className="mt-6 text-xs text-gray-500 break-all">{localURL}</p>
      </div>
    </div>
  );
};

export default GenerateQRPage;
