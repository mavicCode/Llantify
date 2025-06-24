// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HistoryPage from "./components/HistoryPage.jsx";


const App = () => {
  return (
    <Routes>
      <Route path="/historial" element={<HistoryPage />} />
    </Routes>
  );
};

export default App;
