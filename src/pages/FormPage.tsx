import { useParams } from "react-router-dom";
import StepForm from "../components/StepForm";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const FormPage = () => {
  const { id } = useParams(); // get `id` from URL like /form/123

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 to-black p-4 text-white">
        <div className="w-full max-w-md bg-white text-black rounded-xl shadow-lg p-6">
          <StepForm formId={id} />
        </div>
      </div>
    </>
  );
};

export default FormPage;
