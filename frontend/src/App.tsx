import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Company from './pages/company';
import Home from './pages/home';
import Login from './pages/login';
import Logout from './pages/logout';
import Register from './pages/register';

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence exitBeforeEnter>
        <Routes key="routes" >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/company/:id" element={<Company />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
