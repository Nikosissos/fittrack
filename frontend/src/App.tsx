import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Seances from './pages/Seances';
import DetailSeance from './pages/DetailSeance';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Seances />} />
        <Route path="/seances/:id" element={<DetailSeance />} />
      </Routes>
    </BrowserRouter>
  );
}
