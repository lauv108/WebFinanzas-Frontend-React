import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { usePresupuestos, useMoneda } from '../hooks/useCustomHooks';
import '../styles/Presupuesto.css';

const CATEGORIAS = ['Alimentación', 'Transporte', 'Entretenimiento', 'Salud', 'Educación', 'Servicios'];

function Presupuesto() {
  const { presupuestos, actualizarPresupuesto } = useContext(AppContext);
  const formatoMoneda = useMoneda();
  const presupuestosActuales = usePresupuestos();
  const [tope, setTope] = React.useState('');

  const handleGuardarPresupuesto = async (categoria) => {
    const nuevoTope = parseFloat(tope);
    if (!nuevoTope || nuevoTope <= 0) {
      alert('Ingrese un monto válido');
      return;
    }

    actualizarPresupuesto({
      categoria,
      tope: nuevoTope,
      mes: new Date().toISOString().substring(0, 7)
    });
    
    setTope('');
    alert('✅ Presupuesto guardado');
  };

  return (
    <div className="presupuesto">
      <h2>Gestión de Presupuestos</h2>

      <div className="presupuesto-contenedor">
        <h3>Configurar topes mensuales</h3>
        
        {CATEGORIAS.map(cat => (
          <div key={cat} className="presupuesto-item">
            <label>{cat}</label>
            <input
              type="number"
              placeholder="Monto"
              step="1000"
              onChange={(e) => setTope(e.target.value)}
            />
            <button 
              className="btn btn-primary btn-small"
              onClick={() => handleGuardarPresupuesto(cat)}
            >
              Guardar
            </button>
          </div>
        ))}
      </div>

      <div className="presupuesto-estado">
        <h3>Estado actual del presupuesto</h3>
        {Object.entries(presupuestosActuales).length > 0 ? (
          <div className="presupuestos-list">
            {Object.entries(presupuestosActuales).map(([cat, data]) => {
              const porcentaje = data.gasto ? (data.gasto / data.tope) * 100 : 0;
              const estado = porcentaje >= 100 ? 'rojo' : porcentaje >= 90 ? 'amarillo' : 'verde';
              
              return (
                <div key={cat} className={`presupuesto-card ${estado}`}>
                  <h4>{cat}</h4>
                  <p>Tope: {formatoMoneda(data.tope)}</p>
                  <p>Gastado: {formatoMoneda(data.gasto || 0)}</p>
                  <div className="progress-bar">
                    <div className="progress" style={{width: `${Math.min(porcentaje, 100)}%`}}></div>
                  </div>
                  <p className="porcentaje">{porcentaje.toFixed(0)}%</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="empty-state">No hay presupuestos configurados aún.</p>
        )}
      </div>
    </div>
  );
}

export default Presupuesto;
