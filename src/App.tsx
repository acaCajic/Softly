import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="*" element={<p>not found page</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
