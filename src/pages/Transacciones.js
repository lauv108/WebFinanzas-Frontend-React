import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useTransacciones, useFormulario, useMoneda } from '../hooks/useCustomHooks';
import { transaccionService } from '../services/apiService';
import '../styles/Transacciones.css';

/**
 * PÁGINA TRANSACCIONES
 * 
 * Demuestra:
 * - useState implícito en useFormulario para formularios
 * - useContext para acceder a transacciones globales
 * - useEffect en useTransacciones para cargar datos
 * - Métodos HTTP: POST (crear), PUT (actualizar), DELETE (eliminar)
 * - Validación de formularios
 */

const CATEGORIAS = [
  'Alimentación',
  'Transporte',
  'Entretenimiento',
  'Salud',
  'Educación',
  'Servicios',
  'Otro'
];

function Transacciones() {
  const { agregarTransaccion, actualizarTransaccion, eliminarTransaccion } = useContext(AppContext);
  const transacciones = useTransacciones();
  const formatoMoneda = useMoneda();

  // Estado para filtros
  const [filtro, setFiltro] = React.useState('');
  const [categoriaFiltro, setCategoriaFiltro] = React.useState('');

  // Estado del formulario
  const { 
    valores, 
    handleChange, 
    handleSubmit, 
    resetFormulario,
    errores 
  } = useFormulario(
    { tipo: 'gasto', descripcion: '', monto: '', categoria: '', fecha: '' },
    async (valores) => {
      try {
        const transaccion = {
          ...valores,
          monto: parseFloat(valores.monto),
          fecha: new Date(valores.fecha).toISOString()
        };
        
        const resultado = await transaccionService.crear(transaccion);
        agregarTransaccion(resultado);
        resetFormulario();
        alert('✅ Transacción registrada correctamente');
      } catch (error) {
        alert('❌ Error: ' + error.message);
        throw error;
      }
    }
  );

  // Filtrar transacciones
  const transaccionesFiltradas = (transacciones || []).filter(t => {
    const coincideTexto = t.descripcion.toLowerCase().includes(filtro.toLowerCase());
    const coincideCategoria = !categoriaFiltro || t.categoria === categoriaFiltro;
    return coincideTexto && coincideCategoria;
  });

  // Manejar eliminación
  const handleEliminar = async (id) => {
    if (!window.confirm('¿Está seguro de que desea eliminar esta transacción?')) return;
    
    try {
      await transaccionService.eliminar(id);
      eliminarTransaccion(id);
      alert('✅ Transacción eliminada');
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }
  };

  return (
    <div className="transacciones">
      <h2>Registro de Transacciones</h2>

      {/* FORMULARIO DE ENTRADA */}
      <div className="formulario-contenedor">
        <h3>Registrar nueva transacción</h3>
        <form onSubmit={handleSubmit} className="formulario">
          
          <div className="form-group">
            <label>Tipo:</label>
            <select name="tipo" value={valores.tipo} onChange={handleChange} required>
              <option value="gasto">Gasto</option>
              <option value="ingreso">Ingreso</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <input
              type="text"
              name="descripcion"
              placeholder="Ej: Café en la mañana"
              value={valores.descripcion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Monto:</label>
            <input
              type="number"
              name="monto"
              placeholder="0"
              value={valores.monto}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Categoría:</label>
            <select name="categoria" value={valores.categoria} onChange={handleChange} required>
              <option value="">Seleccionar...</option>
              {CATEGORIAS.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="date"
              name="fecha"
              value={valores.fecha}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Registrar Transacción</button>
          {errores.global && <p className="error">{errores.global}</p>}
        </form>
      </div>

      {/* FILTROS */}
      <div className="filtros">
        <input
          type="text"
          placeholder="🔍 Buscar por descripción..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="input-filtro"
        />
        
        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="select-filtro"
        >
          <option value="">Todas las categorías</option>
          {CATEGORIAS.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* TABLA DE TRANSACCIONES */}
      <div className="tabla-contenedor">
        <h3>Historial ({transaccionesFiltradas.length} registros)</h3>
        {transaccionesFiltradas.length > 0 ? (
          <table className="tabla-transacciones">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Tipo</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {transaccionesFiltradas.map(t => (
                <tr key={t.id}>
                  <td>{t.descripcion}</td>
                  <td>{t.categoria}</td>
                  <td>
                    <span className={`badge ${t.tipo}`}>
                      {t.tipo === 'ingreso' ? '➕ Ingreso' : '➖ Gasto'}
                    </span>
                  </td>
                  <td className={t.tipo}>{formatoMoneda(t.monto)}</td>
                  <td>{new Date(t.fecha).toLocaleDateString('es-CO')}</td>
                  <td>
                    <button 
                      className="btn btn-danger btn-small"
                      onClick={() => handleEliminar(t.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-state">No hay transacciones que coincidan con el filtro.</p>
        )}
      </div>
    </div>
  );
}

export default Transacciones;
