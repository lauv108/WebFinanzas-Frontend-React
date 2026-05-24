import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transacciones from './pages/Transacciones';
import Presupuesto from './pages/Presupuesto';
import Resumen from './pages/Resumen';
import Exportacion from './pages/Exportacion';
import './styles/App.css';

/**
 * COMPONENTE PRINCIPAL - APP
 * 
 * Configura:
 * - React Router para navegación entre páginas
 * - AppProvider para el contexto global (Context API)
 * - Estructura de la aplicación
 */

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Ruta por defecto → Dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Rutas principales */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transacciones" element={<Transacciones />} />
              <Route path="/presupuesto" element={<Presupuesto />} />
              <Route path="/resumen" element={<Resumen />} />
              <Route path="/exportacion" element={<Exportacion />} />
              
              {/* Ruta comodín para 404 */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
