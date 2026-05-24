# WebFinanzas - Frontend React

**Aplicación web de gestión de finanzas personales**

![Badge: React](https://img.shields.io/badge/React-18.2.0-blue)
![Badge: Node.js](https://img.shields.io/badge/Node.js-16+-green)
![Badge: License](https://img.shields.io/badge/License-MIT-yellow)

## Descripción

WebFinanzas es una aplicación web moderna para la gestión de finanzas personales. Permite a los usuarios registrar ingresos y gastos, establecer presupuestos mensuales, visualizar análisis gráficos y exportar datos.

Este repositorio contiene el **frontend** desarrollado con **React.js** y las tecnologías modernas del ecosistema JavaScript.

## Características

 **Registro de Transacciones** - Crear, editar y eliminar ingresos/gastos  
 **Gestión de Presupuestos** - Establecer límites mensuales por categoría  
 **Dashboard** - Resumen visual del estado financiero  
 **Análisis Gráficos** - Visualización de gastos con Chart.js  
 **Exportación de Datos** - CSV, JSON y portapapeles  
 **Almacenamiento Local** - Sin necesidad de login  
 **Interfaz Responsiva** - Funciona en mobile y desktop  

## Tecnologías Utilizadas

### Frontend
- **React.js 18** - Librería UI con Hooks y Context API
- **React Router v6** - Navegación entre páginas
- **Axios** - Peticiones HTTP al backend
- **Chart.js** - Gráficos y visualizaciones
- **CSS3** - Estilos modernos con variables CSS

### Conceptos Implementados
-  **Hooks**: `useState`, `useEffect`, `useContext`, `useReducer`, custom hooks
-  **Context API**: Gestión global de estado
-  **REST API**: Peticiones HTTP con Axios
-  **React Router**: Rutas y navegación SPA
-  **Componentes**: Reutilizables y modularizados

## Instalación

### Prerrequisitos
- Node.js 16+ y npm/yarn
- Backend corriendo en `http://localhost:5000`

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/lauv108/WebFinanzas-Frontend-React.git
cd WebFinanzas-Frontend-React
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Editar `.env` si es necesario (por defecto apunta a `localhost:5000`)

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Uso

### Comandos disponibles

```bash
# Iniciar desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Ejecutar pruebas
npm test

# Eject (irreversible)
npm run eject
```

## Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
│   └── Navbar.js
├── pages/             # Páginas/vistas principales
│   ├── Dashboard.js
│   ├── Transacciones.js
│   ├── Presupuesto.js
│   ├── Resumen.js
│   └── Exportacion.js
├── context/           # Context API para estado global
│   └── AppContext.js
├── services/          # Servicios (Axios)
│   └── apiService.js
├── hooks/             # Custom hooks
│   └── useCustomHooks.js
├── styles/            # CSS
│   ├── App.css
│   ├── Navbar.css
│   └── [otros].css
├── App.js             # Componente raíz
├── index.js           # Entrada de React
└── index.css          # Estilos globales
```

## API Backend

El frontend consume un API REST. Endpoints principales:

### Transacciones
- `GET /api/transacciones` - Obtener todas
- `POST /api/transacciones` - Crear nueva
- `PUT /api/transacciones/:id` - Actualizar
- `DELETE /api/transacciones/:id` - Eliminar

### Presupuestos
- `GET /api/presupuestos` - Obtener todos
- `POST /api/presupuestos` - Guardar
- `DELETE /api/presupuestos/:categoria` - Eliminar

Ver [Backend Swagger](#) para documentación completa.

## Características de Código

### Context API - Gestión Global
```javascript
const { transacciones, setTransacciones } = useContext(AppContext);
```

### Custom Hooks
```javascript
const transacciones = useTransacciones(); // Carga datos automáticamente
const { valores, handleChange, handleSubmit } = useFormulario(inicial, callback);
```

### Axios Service
```javascript
const datos = await transaccionService.obtenerTodas();
await transaccionService.crear(nuevaTransaccion);
```

### React Router
```javascript
<Route path="/dashboard" element={<Dashboard />} />
```

## Responsive Design

La aplicación está optimizada para:
- Teléfonos móviles (320px+)
- Tablets (768px+)
- Desktops (1024px+)

## Privacidad

- Datos almacenados localmente en el navegador
- No se transmiten datos sin consentimiento
- Compatible con cookies para persistencia
- Cumple GDPR (sin datos personales identificables)

## Despliegue

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Manual
```bash
npm run build
# Servir la carpeta 'build/' en tu hosting
```

## Documentación

- [Backend Repository](https://github.com/lauv108/WebFinanzas-Backend-Node)
- [Propuesta de Proyecto](./docs/PROPUESTA.md)
- [API Swagger](http://localhost:5000/api-docs)

## Autor

**Laura Daniela Velásquez Marín**  
Estudiante - Corporación Universitaria Iberoamericana  
Curso: Desarrollo de Aplicaciones Web  
Docente: Diana Toquica

## Licencia

Este proyecto es parte de un trabajo académico y se distribuye bajo licencia MIT.

---

**Última actualización**: Junio 2026  
**Estado**: En desarrollo activo
