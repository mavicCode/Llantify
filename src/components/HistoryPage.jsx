import React, { useState } from 'react';
import './HistoryPage.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
//styles
const travelData = [
  { date: '12/05/2025', from: 'Barranco', to: 'San Borja', estimated: 25, real: 22 },
  { date: '13/05/2025', from: 'San Miguel', to: 'Surco', estimated: 35, real: 42 },
  { date: '14/05/2025', from: 'Miraflores', to: 'La Molina', estimated: 40, real: 38 },
  { date: '15/05/2025', from: 'Lima Centro', to: 'San Isidro', estimated: 30, real: 35 }
];

const HistoryPage = () => {
  const [view, setView] = useState('list');

  const days = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  const sampleGraphData = {
    labels: days,
    datasets: [
      {
        label: 'estimado',
        data: [30, 45, 50, 20, 35, 30, 15],
        borderDash: [5, 5],
        tension: 0.4
      },
      {
        label: 'real',
        data: [28, 43, 52, 18, 38, 32, 14],
        tension: 0.4,
        borderColor: '#5F2EEA',
        fill: false
      }
    ]
  };

  return (
    <div className="history-container">
      <h1>Mi historial de viajes</h1>
      <div className="tabs">
        <button
          className={view === 'list' ? 'active' : ''}
          onClick={() => setView('list')}
        >
          Lista
        </button>
        <button
          className={view === 'chart' ? 'active' : ''}
          onClick={() => setView('chart')}
        >
          Gráfico
        </button>
      </div>

      {view === 'list' && (
        <div className="list-view">
          {travelData.map((t, i) => (
            <div key={i} className="card">
              <div className="card-header">
                <span>{t.date}</span>
                <span>&gt;</span>
              </div>
              <div className="card-body">
                <p>{t.from} → {t.to}</p>
                <div className="times">
                  <span>
                    ⏱ Estimado: {t.estimated} min
                  </span>
                  <span className={t.real > t.estimated ? 'late' : 'on-time'}>
                    ⏱ Real: {t.real} min
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'chart' && (
        <div className="chart-view">
          <div className="chart-card">
            <Line data={sampleGraphData} options={{
              plugins: { legend: { position: 'bottom' } },
              scales: { y: { suggestedMin: 0, suggestedMax: 60, title: { display: true, text: 'minutos' } } }
            }} />
            <button className="download-btn">Descargar informe</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;