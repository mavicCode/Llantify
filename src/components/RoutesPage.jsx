import React, { useState } from 'react';
import { FiRefreshCw, FiPlus, FiSearch } from 'react-icons/fi';
import Header from './header';
import './RoutesPage.css';
import ReportModal from './ReportModal';


const fakeData = [
  { id: 1, from: 'Lima Centro', to: 'San Isidro', eta: '25 min', load: 'Bajo' },
  { id: 2, from: 'Miraflores', to: 'La Molina', eta: '35 min', load: 'Medio', pct: 65 },
  { id: 3, from: 'San Miguel', to: 'Surco', eta: '40 min', load: 'Alto' },
];

export default function RoutesPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
   <>
      <Header userName="Junior García" />

      <div className="routes-page">
        <h1 className="routes-title">Elige tu ruta</h1>

        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            className="routes-search"
            type="text"
            placeholder="Origen / Destino"
          />
        </div>

        <div className="routes-list">
          {fakeData.map(r => (
            <div key={r.id} className="route-card">
              <div className="route-card__header">
                <span className="route-name">🚍 {r.from} → {r.to}</span>
                <span className={`status status--${r.load.toLowerCase()}`}>
                  {r.load === 'Medio' ? `${r.pct}% ocupación` : r.load}
                </span>
                <button className="btn-icon" title="Actualizar">
                  <FiRefreshCw />
                </button>
              </div>

              <div className="route-card__body">
                <small>Tiempo estimado: {r.eta}</small>
                <div className="route-card__actions">
                  <button className="btn-outline danger">Sí, va lleno</button>
                  <button className="btn-outline success">No, hay espacio</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn-float"
          onClick={() => setModalOpen(true)}
          title="Reportar otra ruta"
        >
          <FiPlus />
        </button>

        {isModalOpen && <ReportModal onClose={() => setModalOpen(false)} />}
      </div>
    </>
  );
}