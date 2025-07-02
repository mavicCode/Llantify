import React, { useState } from "react";
import "./ReportModal.css";

export default function ReportModal({ onClose }) {
  const [form, setForm] = useState({
    origen: "",
    destino: "",
    carga: "Bajo",
    comentario: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reporte enviado:", form);
    onClose(); // cierra el modal
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Reportar nueva ruta</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            name="origen"
            placeholder="Origen"
            value={form.origen}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="destino"
            placeholder="Destino"
            value={form.destino}
            onChange={handleChange}
            required
          />
          <select name="carga" value={form.carga} onChange={handleChange}>
            <option value="Bajo">Bajo</option>
            <option value="Medio">Medio</option>
            <option value="Alto">Alto</option>
          </select>
          <textarea
            name="comentario"
            placeholder="Comentario adicional..."
            rows={3}
            value={form.comentario}
            onChange={handleChange}
          />
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              Enviar reporte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
