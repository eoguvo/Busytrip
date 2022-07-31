import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Company from './pages/company';
import Home from './pages/home';
import Login from './pages/login';
import Logout from './pages/logout';
import Register from './pages/register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/company/:id" element={<Company />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
