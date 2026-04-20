import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Seances from './pages/Seances';
import DetailSeance from './pages/DetailSeance';
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute';
import Register from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <Seances />
          </PrivateRoute>
        } />
        <Route path="/seances/:id" element={
          <PrivateRoute>
            <DetailSeance />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
