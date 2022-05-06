import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Verify from './pages/Verify';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="verify" element={<Verify />} />
        <Route path="*" element={<p>not found page</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
