import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { transaccionService, presupuestoService } from '../services/apiService';

/**
 * CUSTOM HOOKS - Lógica reutilizable
 * 
 * Los custom hooks permiten encapsular lógica compleja que combina
 * varios hooks (useState, useEffect, useContext, useCallback)
 * y reutilizarla en múltiples componentes.
 */

/**
 * Hook: useTransacciones
 * Carga todas las transacciones desde el servidor y las guarda en el contexto
 */
export function useTransacciones() {
  const { transacciones, setTransacciones, setCargando, setError } = useContext(AppContext);
  const [cargadoInicial, setCargadoInicial] = useState(false);

  useEffect(() => {
    if (cargadoInicial) return; // Evitar cargas duplicadas

    const cargarTransacciones = async () => {
      try {
        setCargando(true);
        const datos = await transaccionService.obtenerTodas();
        setTransacciones(datos);
        setError(null);
      } catch (error) {
        setError(error.message);
        console.error(error);
      } finally {
        setCargando(false);
        setCargadoInicial(true);
      }
    };

    cargarTransacciones();
  }, [cargadoInicial, setTransacciones, setCargando, setError]);

  return transacciones;
}

/**
 * Hook: usePresupuestos
 * Carga todos los presupuestos desde el servidor
 */
export function usePresupuestos() {
  const { presupuestos, setPresupuestos, setCargando } = useContext(AppContext);
  const [cargadoInicial, setCargadoInicial] = useState(false);

  useEffect(() => {
    if (cargadoInicial) return;

    const cargarPresupuestos = async () => {
      try {
        setCargando(true);
        const datos = await presupuestoService.obtenerTodos();
        setPresupuestos(datos);
      } catch (error) {
        console.error('Error cargando presupuestos:', error);
      } finally {
        setCargando(false);
        setCargadoInicial(true);
      }
    };

    cargarPresupuestos();
  }, [cargadoInicial, setPresupuestos, setCargando]);

  return presupuestos;
}

/**
 * Hook: useFormulario
 * Gestiona el estado de un formulario con validación simple
 */
export function useFormulario(valoresIniciales, onSubmit) {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      await onSubmit(valores);
      setValores(valoresIniciales);
      setErrores({});
    } catch (error) {
      setErrores({ global: error.message });
    } finally {
      setEnviando(false);
    }
  };

  const resetFormulario = () => {
    setValores(valoresIniciales);
    setErrores({});
  };

  return {
    valores,
    setValores,
    errores,
    setErrores,
    handleChange,
    handleSubmit,
    resetFormulario,
    enviando
  };
}

/**
 * Hook: useFiltro
 * Maneja el filtrado de una lista de datos
 */
export function useFiltro(items, predicado) {
  const [filtro, setFiltro] = useState('');

  const itemsFiltrados = items.filter(item => 
    predicado(item, filtro)
  );

  return {
    filtro,
    setFiltro,
    itemsFiltrados
  };
}

/**
 * Hook: useMoneda
 * Formatea números como moneda colombiana
 */
export function useMoneda() {
  return (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  };
}
