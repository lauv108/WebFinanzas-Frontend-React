import axios from 'axios';

/**
 * SERVICIO DE AXIOS - Peticiones HTTP
 * 
 * Este archivo centraliza todas las peticiones HTTP hacia la API REST del backend.
 * Define la URL base, interceptores y métodos reutilizables para CRUD.
 * 
 * REST Architecture:
 * - GET /api/transacciones → Obtener todas las transacciones
 * - POST /api/transacciones → Crear nueva transacción
 * - PUT /api/transacciones/:id → Actualizar transacción
 * - DELETE /api/transacciones/:id → Eliminar transacción
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Crear instancia de Axios con configuración personalizada
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Interceptor de solicitudes
 * Se ejecuta antes de enviar cada petición
 */
apiClient.interceptors.request.use(
  (config) => {
    // Aquí se podría agregar token de autenticación
    // const token = localStorage.getItem('auth_token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    
    console.log('📤 Petición HTTP:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Interceptor de respuestas
 * Se ejecuta cuando se recibe una respuesta del servidor
 */
apiClient.interceptors.response.use(
  (response) => {
    console.log('📥 Respuesta recibida:', response.status, response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('❌ Error del servidor:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('❌ Sin respuesta del servidor:', error.request);
    } else {
      console.error('❌ Error de configuración:', error.message);
    }
    return Promise.reject(error);
  }
);

// ═════════════════════════════════════════════════════════════════════════════
// SERVICIOS PARA TRANSACCIONES
// ═════════════════════════════════════════════════════════════════════════════

export const transaccionService = {
  /**
   * GET /api/transacciones
   * Obtiene todas las transacciones del usuario actual
   */
  obtenerTodas: async () => {
    try {
      const { data } = await apiClient.get('/transacciones');
      return data;
    } catch (error) {
      throw new Error('Error al cargar transacciones: ' + error.message);
    }
  },

  /**
   * GET /api/transacciones/:id
   * Obtiene una transacción específica por ID
   */
  obtenerPorId: async (id) => {
    try {
      const { data } = await apiClient.get(`/transacciones/${id}`);
      return data;
    } catch (error) {
      throw new Error('Error al cargar transacción: ' + error.message);
    }
  },

  /**
   * POST /api/transacciones
   * Crea una nueva transacción
   * Body esperado: { tipo, monto, categoria, fecha, descripcion }
   */
  crear: async (transaccion) => {
    try {
      const { data } = await apiClient.post('/transacciones', transaccion);
      return data;
    } catch (error) {
      throw new Error('Error al crear transacción: ' + error.message);
    }
  },

  /**
   * PUT /api/transacciones/:id
   * Actualiza una transacción existente
   */
  actualizar: async (id, transaccion) => {
    try {
      const { data } = await apiClient.put(`/transacciones/${id}`, transaccion);
      return data;
    } catch (error) {
      throw new Error('Error al actualizar transacción: ' + error.message);
    }
  },

  /**
   * DELETE /api/transacciones/:id
   * Elimina una transacción
   */
  eliminar: async (id) => {
    try {
      const { data } = await apiClient.delete(`/transacciones/${id}`);
      return data;
    } catch (error) {
      throw new Error('Error al eliminar transacción: ' + error.message);
    }
  },

  /**
   * GET /api/transacciones/mes/:mes
   * Obtiene todas las transacciones de un mes específico
   */
  obtenerPorMes: async (mes) => {
    try {
      const { data } = await apiClient.get(`/transacciones/mes/${mes}`);
      return data;
    } catch (error) {
      throw new Error('Error al cargar transacciones del mes: ' + error.message);
    }
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// SERVICIOS PARA PRESUPUESTOS
// ═════════════════════════════════════════════════════════════════════════════

export const presupuestoService = {
  /**
   * GET /api/presupuestos
   * Obtiene todos los presupuestos del usuario
   */
  obtenerTodos: async () => {
    try {
      const { data } = await apiClient.get('/presupuestos');
      return data;
    } catch (error) {
      throw new Error('Error al cargar presupuestos: ' + error.message);
    }
  },

  /**
   * POST /api/presupuestos
   * Crea o actualiza un presupuesto
   */
  guardar: async (presupuesto) => {
    try {
      const { data } = await apiClient.post('/presupuestos', presupuesto);
      return data;
    } catch (error) {
      throw new Error('Error al guardar presupuesto: ' + error.message);
    }
  },

  /**
   * DELETE /api/presupuestos/:categoria
   * Elimina un presupuesto de una categoría
   */
  eliminar: async (categoria) => {
    try {
      const { data } = await apiClient.delete(`/presupuestos/${categoria}`);
      return data;
    } catch (error) {
      throw new Error('Error al eliminar presupuesto: ' + error.message);
    }
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// SERVICIOS PARA REPORTES Y EXPORTACIÓN
// ═════════════════════════════════════════════════════════════════════════════

export const reporteService = {
  /**
   * GET /api/reportes/resumen/:mes
   * Obtiene el resumen financiero de un mes
   */
  obtenerResumen: async (mes) => {
    try {
      const { data } = await apiClient.get(`/reportes/resumen/${mes}`);
      return data;
    } catch (error) {
      throw new Error('Error al cargar resumen: ' + error.message);
    }
  },

  /**
   * GET /api/reportes/exportar
   * Obtiene los datos para exportar a CSV
   */
  obtenerExportacion: async () => {
    try {
      const { data } = await apiClient.get('/reportes/exportar');
      return data;
    } catch (error) {
      throw new Error('Error al preparar exportación: ' + error.message);
    }
  }
};

export default apiClient;
