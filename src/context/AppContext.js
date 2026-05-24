import React, { createContext, useReducer, useCallback } from 'react';

/**
 * CONTEXT API - Gestión global del estado de la aplicación
 * 
 * Este contexto centraliza el estado de transacciones, presupuestos
 * y otros datos globales que se comparten entre componentes.
 */

export const AppContext = createContext();

// Action types para useReducer
const TYPES = {
  SET_TRANSACCIONES: 'SET_TRANSACCIONES',
  AGREGAR_TRANSACCION: 'AGREGAR_TRANSACCION',
  ACTUALIZAR_TRANSACCION: 'ACTUALIZAR_TRANSACCION',
  ELIMINAR_TRANSACCION: 'ELIMINAR_TRANSACCION',
  SET_PRESUPUESTOS: 'SET_PRESUPUESTOS',
  ACTUALIZAR_PRESUPUESTO: 'ACTUALIZAR_PRESUPUESTO',
  SET_MES_SELECCIONADO: 'SET_MES_SELECCIONADO',
  SET_CARGANDO: 'SET_CARGANDO',
  SET_ERROR: 'SET_ERROR'
};

const initialState = {
  transacciones: [],
  presupuestos: {},
  mesSeleccionado: new Date().toISOString().substring(0, 7), // YYYY-MM
  cargando: false,
  error: null
};

/**
 * REDUCER - Gestiona todas las acciones que modifican el estado
 * Utiliza el patrón useReducer para lógica compleja de estado
 */
function appReducer(state, action) {
  switch (action.type) {
    case TYPES.SET_TRANSACCIONES:
      return { ...state, transacciones: action.payload };
    
    case TYPES.AGREGAR_TRANSACCION:
      return { ...state, transacciones: [...state.transacciones, action.payload] };
    
    case TYPES.ACTUALIZAR_TRANSACCION:
      return {
        ...state,
        transacciones: state.transacciones.map(t =>
          t.id === action.payload.id ? action.payload : t
        )
      };
    
    case TYPES.ELIMINAR_TRANSACCION:
      return {
        ...state,
        transacciones: state.transacciones.filter(t => t.id !== action.payload)
      };
    
    case TYPES.SET_PRESUPUESTOS:
      return { ...state, presupuestos: action.payload };
    
    case TYPES.ACTUALIZAR_PRESUPUESTO:
      return {
        ...state,
        presupuestos: { ...state.presupuestos, [action.payload.categoria]: action.payload }
      };
    
    case TYPES.SET_MES_SELECCIONADO:
      return { ...state, mesSeleccionado: action.payload };
    
    case TYPES.SET_CARGANDO:
      return { ...state, cargando: action.payload };
    
    case TYPES.SET_ERROR:
      return { ...state, error: action.payload };
    
    default:
      return state;
  }
}

/**
 * PROVIDER - Componente que proporciona el contexto a toda la aplicación
 * Wrappea el árbol de componentes para que todos puedan acceder al estado global
 */
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Acciones memorizadas para evitar re-renders innecesarios
  const setTransacciones = useCallback(
    (transacciones) => dispatch({ type: TYPES.SET_TRANSACCIONES, payload: transacciones }),
    []
  );

  const agregarTransaccion = useCallback(
    (transaccion) => dispatch({ type: TYPES.AGREGAR_TRANSACCION, payload: transaccion }),
    []
  );

  const actualizarTransaccion = useCallback(
    (transaccion) => dispatch({ type: TYPES.ACTUALIZAR_TRANSACCION, payload: transaccion }),
    []
  );

  const eliminarTransaccion = useCallback(
    (id) => dispatch({ type: TYPES.ELIMINAR_TRANSACCION, payload: id }),
    []
  );

  const setPresupuestos = useCallback(
    (presupuestos) => dispatch({ type: TYPES.SET_PRESUPUESTOS, payload: presupuestos }),
    []
  );

  const actualizarPresupuesto = useCallback(
    (presupuesto) => dispatch({ type: TYPES.ACTUALIZAR_PRESUPUESTO, payload: presupuesto }),
    []
  );

  const setMesSeleccionado = useCallback(
    (mes) => dispatch({ type: TYPES.SET_MES_SELECCIONADO, payload: mes }),
    []
  );

  const setCargando = useCallback(
    (valor) => dispatch({ type: TYPES.SET_CARGANDO, payload: valor }),
    []
  );

  const setError = useCallback(
    (error) => dispatch({ type: TYPES.SET_ERROR, payload: error }),
    []
  );

  const value = {
    // Estado
    transacciones: state.transacciones,
    presupuestos: state.presupuestos,
    mesSeleccionado: state.mesSeleccionado,
    cargando: state.cargando,
    error: state.error,
    // Acciones
    setTransacciones,
    agregarTransaccion,
    actualizarTransaccion,
    eliminarTransaccion,
    setPresupuestos,
    actualizarPresupuesto,
    setMesSeleccionado,
    setCargando,
    setError
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export const ACTION_TYPES = TYPES;
