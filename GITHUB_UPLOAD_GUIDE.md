# 📚 GUÍA PASO A PASO: Subir WebFinanzas Frontend a GitHub

## Parte 1: Preparativos Iniciales

### Paso 1: Crear cuenta en GitHub (si no tienes)
1. Ir a https://github.com
2. Hacer clic en "Sign up"
3. Completar el formulario con:
   - Correo electrónico
   - Contraseña segura
   - Nombre de usuario (ej: lauv108)
4. Verificar el email

### Paso 2: Instalar Git en tu computadora
```bash
# Windows: Descargar de https://git-scm.com/download/win
# Mac: Descargar de https://git-scm.com/download/mac
# Linux (Debian/Ubuntu):
sudo apt-get install git

# Verificar instalación
git --version
```

### Paso 3: Configurar Git por primera vez
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@gmail.com"

# Verificar configuración
git config --global --list
```

---

## Parte 2: Crear Repositorio en GitHub

### Paso 4: Crear nuevo repositorio en GitHub
1. Ir a https://github.com/new
2. Llenar información:
   - **Repository name**: `WebFinanzas-Frontend-React`
   - **Description**: "Frontend de WebFinanzas - Aplicación web de gestión de finanzas personales"
   - **Visibility**: Public
   - **Add a README file**: NO (ya tenemos uno)
   - **Add .gitignore**: NO (ya tenemos uno)
3. Hacer clic en "Create repository"

### Paso 5: Copiar la URL del repositorio
- Ver el botón verde "Code" 
- Seleccionar pestaña "HTTPS"
- Copiar la URL (ej: https://github.com/lauv108/WebFinanzas-Frontend-React.git)

---

## Parte 3: Subir el Código

### Opción A: Desde la terminal (RECOMENDADO)

#### Paso 6: Abrir terminal/CMD en la carpeta del proyecto
```bash
# Windows (PowerShell o CMD)
cd C:\Users\TuUsuario\Desktop\WebFinanzas-Frontend-React

# Mac/Linux
cd ~/Desktop/WebFinanzas-Frontend-React
```

#### Paso 7: Inicializar repositorio local
```bash
# Inicializar git en la carpeta
git init

# Ver estado
git status
```

#### Paso 8: Agregar archivos al staging
```bash
# Agregar TODOS los archivos
git add .

# Ver archivos preparados (deben estar en verde)
git status
```

#### Paso 9: Hacer commit (registro de cambios)
```bash
# Crear primer commit
git commit -m "✨ Commit inicial: Frontend React con Context API, Hooks, y Axios"

# Ver commits
git log
```

#### Paso 10: Conectar con GitHub y subir
```bash
# Añadir la URL del repositorio remoto
git remote add origin https://github.com/TU_USUARIO/WebFinanzas-Frontend-React.git

# Cambiar rama a 'main' (si es necesario)
git branch -M main

# Subir archivos a GitHub
git push -u origin main

# Siguientes pushes (más simple):
git push
```

**¡LISTO! Tu código está en GitHub** ✅

---

### Opción B: Usando GitHub Desktop (GUI)

Si prefieres interfaz gráfica:

1. Descargar https://desktop.github.com
2. Instalar y abrir GitHub Desktop
3. Hacer clic en "File" → "Add Local Repository"
4. Seleccionar la carpeta `WebFinanzas-Frontend-React`
5. Hacer clic en "Publish repository"
6. Llenar:
   - Name: `WebFinanzas-Frontend-React`
   - Description: "Frontend de WebFinanzas..."
7. Hacer clic en "Publish Repository"

---

## Parte 4: Hacer cambios y actualizaciones

### Cuando hagas cambios en el código:

```bash
# 1. Ver estado (qué cambió)
git status

# 2. Agregar cambios
git add .

# 3. Crear commit descriptivo
git commit -m "🔧 Descripción del cambio realizado"

# 4. Subir a GitHub
git push
```

### Ejemplos de mensajes de commit buenos:
```
✨ Agregar página de Presupuesto
🐛 Corregir error en cálculo de totales
🔧 Mejorar estilos de Dashboard
📝 Actualizar README con instrucciones
🎨 Cambiar paleta de colores
```

---

## Parte 5: Verificar en GitHub

### Paso 11: Confirmar que se subió todo
1. Ir a https://github.com/TU_USUARIO/WebFinanzas-Frontend-React
2. Verificar que aparezcan:
   - ✅ Carpeta `src/` con todos los componentes
   - ✅ Carpeta `public/` con index.html
   - ✅ Archivo `package.json`
   - ✅ Archivo `README.md`
   - ✅ Archivo `.gitignore`
   - ✅ Archivo `.env.example`

### Paso 12: Agregar descripción al repositorio (Opcional)
1. En GitHub, hacer clic en el ⚙️ (Settings)
2. En la sección "About", hacer clic en el 📝
3. Añadir descripción, website (si tienes), y tópicos
4. Guardar cambios

---

## Errores Comunes y Soluciones

### ❌ "fatal: not a git repository"
**Solución**: Asegúrate de estar en la carpeta correcta y haber ejecutado `git init`

### ❌ "Permission denied (publickey)"
**Solución**: Configurar SSH key:
```bash
ssh-keygen -t ed25519 -C "tu.email@gmail.com"
# Seguir las instrucciones, dejar contraseña vacía
# Luego agregar la clave en GitHub Settings → SSH Keys
```

### ❌ "Your branch is behind"
**Solución**: Alguien más hizo cambios. Actualizar:
```bash
git pull
```

### ❌ "CONFLICT: Conflicto de merge"
**Solución**: Editar el archivo en conflicto, eliminar los marcadores `<<<`, `===`, `>>>`, y hacer:
```bash
git add .
git commit -m "🔧 Resolver conflicto"
git push
```

---

## Datos de Entrega

**Repositorio a entregar:**
```
https://github.com/TU_USUARIO/WebFinanzas-Frontend-React
```

**Rama**: `main`

**Archivos principales**:
- `src/context/AppContext.js` - Context API
- `src/services/apiService.js` - Axios
- `src/hooks/useCustomHooks.js` - Custom Hooks
- `src/pages/` - Componentes con React Router
- `README.md` - Documentación

---

## ¡Listo! 🎉

Ya tienes tu código en GitHub. Ahora puedes:
- Compartir el link con tu profesor/grupo
- Usar version control profesional
- Colaborar con otros desarrolladores
- Mostrar tu portfolio en GitHub

**Próximo paso**: Crear rama `develop` para desarrollo:
```bash
git checkout -b develop
git push -u origin develop
```

---

*Última actualización: Junio 2026*
*Para dudas, consulta: https://docs.github.com*
