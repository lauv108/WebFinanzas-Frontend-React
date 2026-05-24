import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useTransacciones, useMoneda } from '../hooks/useCustomHooks';
import '../styles/Dashboard.css';

/**
 * PÁGINA DASHBOARD
 * 
 * Demuestra el uso de:
 * - useContext: acceso al contexto global
 * - useEffect: cargar datos al montar el componente
 * - Custom hooks: useTransacciones, useMoneda
 * - useState: gestión de estado local (implícito en hooks personalizados)
 */

function Dashboard() {
  const { mesSeleccionado } = useContext(AppContext);
  const transacciones = useTransacciones();
  const formatoMoneda = useMoneda();

  // Calcular totales del mes actual
  const [totales, setTotales] = React.useState({
    ingresos: 0,
    gastos: 0,
    balance: 0
  });

  useEffect(() => {
    if (!transacciones || transacciones.length === 0) {
      setTotales({ ingresos: 0, gastos: 0, balance: 0 });
      return;
    }

    const ingresos = transacciones
      .filter(t => t.tipo === 'ingreso')
      .reduce((sum, t) => sum + (t.monto || 0), 0);

    const gastos = transacciones
      .filter(t => t.tipo === 'gasto')
      .reduce((sum, t) => sum + (t.monto || 0), 0);

    setTotales({
      ingresos,
      gastos,
      balance: ingresos - gastos
    });
  }, [transacciones]);

  // Obtener últimas transacciones
  const ultimasTransacciones = (transacciones || []).slice(-5).reverse();

  return (
    <div className="dashboard">
      <h2>Dashboard — {mesSeleccionado}</h2>

      {/* Tarjetas de resumen */}
      <div className="summary-cards">
        <div className="card card-ingresos">
          <h3>Ingresos del mes</h3>
          <p className="amount">{formatoMoneda(totales.ingresos)}</p>
        </div>

        <div className="card card-gastos">
          <h3>Gastos del mes</h3>
          <p className="amount">{formatoMoneda(totales.gastos)}</p>
        </div>

        <div className={`card card-balance ${totales.balance >= 0 ? 'positivo' : 'negativo'}`}>
          <h3>Balance disponible</h3>
          <p className="amount">{formatoMoneda(totales.balance)}</p>
        </div>
      </div>

      {/* Últimas transacciones */}
      <div className="recent-transactions">
        <h3>Últimas transacciones</h3>
        {ultimasTransacciones.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Monto</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ultimasTransacciones.map(t => (
                <tr key={t.id}>
                  <td>{t.descripcion}</td>
                  <td>{t.categoria}</td>
                  <td className={t.tipo === 'ingreso' ? 'ingreso' : 'gasto'}>
                    {t.tipo === 'ingreso' ? '+' : '-'} {formatoMoneda(t.monto)}
                  </td>
                  <td>{new Date(t.fecha).toLocaleDateString('es-CO')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-state">No hay transacciones registradas aún.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
