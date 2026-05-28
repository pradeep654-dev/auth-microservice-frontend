import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import ForgotPassword from './forgotpassword';
import { ToastContainer } from 'react-toastify';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
