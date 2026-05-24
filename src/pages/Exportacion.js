import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useTransacciones } from '../hooks/useCustomHooks';
import '../styles/Exportacion.css';

function Exportacion() {
  const transacciones = useTransacciones();

  /**
   * Exportar a CSV
   * Genera un archivo CSV con todas las transacciones
   */
  const exportarCSV = () => {
    if (!transacciones || transacciones.length === 0) {
      alert('No hay transacciones para exportar');
      return;
    }

    // Crear encabezados
    const headers = ['Fecha', 'Descripción', 'Categoría', 'Tipo', 'Monto'];
    
    // Crear filas
    const rows = transacciones.map(t => [
      new Date(t.fecha).toLocaleDateString('es-CO'),
      t.descripcion,
      t.categoria,
      t.tipo,
      t.monto
    ]);

    // Combinar headers y rows
    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Crear blob y descargar
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WebFinanzas-${new Date().toISOString().substring(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    alert('✅ Archivo descargado correctamente');
  };

  /**
   * Copiar al portapapeles
   */
  const copiarAlPortapapeles = async () => {
    if (!transacciones || transacciones.length === 0) {
      alert('No hay transacciones para copiar');
      return;
    }

    const texto = transacciones
      .map(t => `${t.fecha}\t${t.descripcion}\t${t.categoria}\t${t.tipo}\t${t.monto}`)
      .join('\n');

    try {
      await navigator.clipboard.writeText(texto);
      alert('✅ Datos copiados al portapapeles');
    } catch (error) {
      alert('❌ Error al copiar: ' + error.message);
    }
  };

  /**
   * Generar reporte JSON
   */
  const generarJSON = () => {
    if (!transacciones || transacciones.length === 0) {
      alert('No hay transacciones para exportar');
      return;
    }

    const reporte = {
      fecha_generacion: new Date().toISOString(),
      total_transacciones: transacciones.length,
      transacciones: transacciones
    };

    const blob = new Blob([JSON.stringify(reporte, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WebFinanzas-${new Date().toISOString().substring(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    alert('✅ Archivo JSON descargado');
  };

  return (
    <div className="exportacion">
      <h2>Exportación y Respaldo de Datos</h2>

      <div className="opciones-exportacion">
        <div className="opcion">
          <h3>📥 Exportar a CSV</h3>
          <p>Descarga todas tus transacciones en formato CSV compatible con Excel</p>
          <button className="btn btn-primary" onClick={exportarCSV}>
            Descargar CSV
          </button>
        </div>

        <div className="opcion">
          <h3>📋 Copiar al portapapeles</h3>
          <p>Copia todas tus transacciones para pegearlas en otro lugar</p>
          <button className="btn btn-secondary" onClick={copiarAlPortapapeles}>
            Copiar datos
          </button>
        </div>

        <div className="opcion">
          <h3>📄 Exportar a JSON</h3>
          <p>Descarga un backup completo en formato JSON</p>
          <button className="btn btn-secondary" onClick={generarJSON}>
            Descargar JSON
          </button>
        </div>
      </div>

      {/* Información de privacidad */}
      <div className="privacidad-info">
        <h3>🔒 Privacidad de tus datos</h3>
        <p>
          Todos tus datos se almacenan localmente en tu navegador.
          WebFinanzas no transmite información a servidores externos
          sin tu consentimiento explícito. Tus datos financieros son completamente privados.
        </p>
      </div>

      {/* Resumen de datos */}
      <div className="resumen-datos">
        <h3>📊 Resumen de datos</h3>
        <p>Total de transacciones registradas: <strong>{transacciones?.length || 0}</strong></p>
        <p>Última actualización: <strong>{new Date().toLocaleDateString('es-CO')}</strong></p>
      </div>
    </div>
  );
}

export default Exportacion;
