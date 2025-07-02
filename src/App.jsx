// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HistoryPage from "./components/HistoryPage.jsx";
import RoutesPage from './components/RoutesPage.jsx';
//styles

const App = () => {
  return (
    <Routes>
      <Route path="/historial" element={<HistoryPage />} />
      <Route path="/rutas" element={<RoutesPage />} />
    </Routes>
  );
};

export default App;
