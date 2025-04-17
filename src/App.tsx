import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormPage from './pages/FormPage';
import GenerateQRPage from './pages/GenerateQRPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GenerateQRPage />} />
        <Route path="/form/:id" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
