import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Verify from './pages/Verify';
import GeneralProvider from './Providers/GeneralProvider';
import ProfileWallet from './pages/ProfileWallet';

function App() {
  return (
    <BrowserRouter>
      <GeneralProvider>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="resetpassword" element={<ResetPassword />} />
          <Route path="verify" element={<Verify />} />
          <Route path="profilewallet" element={<ProfileWallet />} />
          <Route path="auctions" element={<ProfileWallet />} />
          <Route index element={<Home />} />
          <Route path="*" element={<p>not found page</p>} />
        </Routes>
      </GeneralProvider>
    </BrowserRouter>
  );
}

export default App;
