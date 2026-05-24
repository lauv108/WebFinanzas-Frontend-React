import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useTransacciones, useMoneda } from '../hooks/useCustomHooks';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../styles/Resumen.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function Resumen() {
  const { mesSeleccionado, setMesSeleccionado } = useContext(AppContext);
  const transacciones = useTransacciones();
  const formatoMoneda = useMoneda();
  const [datosGrafico, setDatosGrafico] = React.useState(null);
  const [totales, setTotales] = React.useState({ ingresos: 0, gastos: 0, balance: 0 });

  useEffect(() => {
    if (!transacciones || transacciones.length === 0) return;

    // Calcular totales
    const ingresos = transacciones
      .filter(t => t.tipo === 'ingreso')
      .reduce((sum, t) => sum + (t.monto || 0), 0);

    const gastos = transacciones
      .filter(t => t.tipo === 'gasto')
      .reduce((sum, t) => sum + (t.monto || 0), 0);

    setTotales({ ingresos, gastos, balance: ingresos - gastos });

    // Agrupar gastos por categoría para el gráfico
    const gastosPorCategoria = {};
    transacciones
      .filter(t => t.tipo === 'gasto')
      .forEach(t => {
        gastosPorCategoria[t.categoria] = (gastosPorCategoria[t.categoria] || 0) + t.monto;
      });

    const colores = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
      '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
    ];

    setDatosGrafico({
      labels: Object.keys(gastosPorCategoria),
      datasets: [{
        data: Object.values(gastosPorCategoria),
        backgroundColor: colores.slice(0, Object.keys(gastosPorCategoria).length),
        borderColor: '#fff',
        borderWidth: 2
      }]
    });
  }, [transacciones]);

  const meses = [
    '2026-05', '2026-04', '2026-03', '2026-02', '2026-01'
  ];

  return (
    <div className="resumen">
      <h2>Resumen Mensual</h2>

      {/* Selector de mes */}
      <div className="mes-selector">
        <select 
          value={mesSeleccionado} 
          onChange={(e) => setMesSeleccionado(e.target.value)}
        >
          {meses.map(mes => (
            <option key={mes} value={mes}>{mes}</option>
          ))}
        </select>
      </div>

      {/* Tarjetas de totales */}
      <div className="resumen-cards">
        <div className="card ingresos">
          <h4>Total Ingresos</h4>
          <p>{formatoMoneda(totales.ingresos)}</p>
        </div>
        <div className="card gastos">
          <h4>Total Gastos</h4>
          <p>{formatoMoneda(totales.gastos)}</p>
        </div>
        <div className={`card balance ${totales.balance >= 0 ? 'positivo' : 'negativo'}`}>
          <h4>Balance</h4>
          <p>{formatoMoneda(totales.balance)}</p>
        </div>
      </div>

      {/* Gráfico */}
      {datosGrafico && datosGrafico.labels.length > 0 ? (
        <div className="grafico-contenedor">
          <h3>Distribución de gastos por categoría</h3>
          <Pie data={datosGrafico} options={{ responsive: true }} />
        </div>
      ) : (
        <p className="empty-state">No hay datos para mostrar en este mes.</p>
      )}
    </div>
  );
}

export default Resumen;
