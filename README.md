<div align="center">
  <img src="./src/assets/logo.png" alt="AGON Logo" width="200"/>
  
  ### Plataforma web de descubrimiento y gestión de videojuegos
  
  [![React](https://img.shields.io/badge/React-19.2.4-61dafb?logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.3.1-646cff?logo=vite)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.2.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
  
  [Demo en vivo](https://ppereac.github.io/Agon/) • [Reportar Bug](https://github.com/PPereaC/Agon/issues) • [Solicitar Feature](https://github.com/PPereaC/Agon/issues)
</div>

---

## 📋 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API y Servicios](#-api-y-servicios)
- [Despliegue](#-despliegue)
- [PWA - Instalación en Android](#-pwa---instalación-en-android)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## 🎮 Sobre el Proyecto

**AGON** es una aplicación web moderna y completa para descubrir, explorar y gestionar videojuegos. La plataforma integra datos de la API de RAWG con un backend personalizado que proporciona autenticación, gestión de usuarios y sistema de favoritos.

### ¿Qué hace especial a AGON?

- **Catálogo Extenso**: Acceso a miles de videojuegos con información detallada
- **Búsqueda Avanzada**: Filtros por género, plataforma, fecha de lanzamiento y más
- **Sistema de Favoritos**: Los usuarios pueden guardar y gestionar sus juegos favoritos
- **Autenticación Segura**: Sistema completo de registro/login con JWT
- **Panel de Administración**: Estadísticas y gestión de usuarios para administradores
- **Responsive Design**: Interfaz adaptable a cualquier dispositivo
- **PWA**: Instalable en dispositivos móviles Android como aplicación nativa
- **Modo Oscuro**: Diseño elegante optimizado para visualización nocturna

---

## ✨ Características Principales

### 🔍 Exploración de Juegos

- **Tendencias**: Juegos más populares y mejor valorados actualmente
- **Novedades**: Últimos lanzamientos ordenados por fecha
- **Próximamente**: Juegos que se lanzarán próximamente con filtros de tiempo
- **Top Games**: Los mejores juegos de todos los tiempos
- **Por Género**: Navegación por categorías (Acción, RPG, Estrategia, etc.)

### 🎯 Detalles Completos

Cada juego incluye:
- Descripción detallada y sinopsis
- Galería de capturas de pantalla
- Trailers y videos oficiales
- Requisitos del sistema (PC)
- DLCs y contenido adicional
- Metacritic score y valoraciones
- Plataformas disponibles
- Fecha de lanzamiento
- Desarrolladores y publishers
- Géneros y etiquetas

### 👤 Gestión de Usuario

- **Registro y Login**: Sistema completo de autenticación
- **Perfil Personal**: Visualización de datos del usuario
- **Favoritos**: Guardar y gestionar juegos favoritos
- **Persistencia de Sesión**: Mantiene la sesión activa con JWT

### 🛡️ Panel de Administración

Exclusivo para usuarios con rol de administrador:
- Estadísticas del sistema (total de usuarios, favoritos)
- Gestión de usuarios
- Métricas de uso de la plataforma

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- **[React 19.2.4](https://reactjs.org/)** - Biblioteca de UI
- **[Vite 7.3.1](https://vitejs.dev/)** - Build tool y dev server
- **[React Router DOM 7.13.0](https://reactrouter.com/)** - Enrutamiento SPA
- **[TailwindCSS 4.2.0](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Framer Motion 12.34.2](https://www.framer.com/motion/)** - Animaciones fluidas
- **[Lucide React](https://lucide.dev/)** - Iconos modernos

### UI Components

- **[HeroUI](https://www.heroui.com/)** - Componentes UI principales
- **[Radix UI](https://www.radix-ui.com/)** - Primitivos accesibles
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes reutilizables
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carruseles táctiles

### PWA & Deployment

- **[vite-plugin-pwa](https://vite-pwa-org.netlify.app/)** - Progressive Web App
- **[gh-pages](https://www.npmjs.com/package/gh-pages)** - Despliegue en GitHub Pages

### APIs Externas

- **[RAWG Video Games Database API](https://rawg.io/apidocs)** - Datos de videojuegos
- **Backend Personalizado** - Autenticación y favoritos (https://agon.ppereac.dev/api)

---

## 🏗️ Arquitectura del Proyecto

### Patrón de Diseño

AGON sigue una arquitectura basada en componentes con separación clara de responsabilidades:

```
┌─────────────────────────────────────────┐
│           React Application             │
├─────────────────────────────────────────┤
│  Components  │  Pages  │  Layouts       │
├─────────────────────────────────────────┤
│  Contexts (Auth, State Management)      │
├─────────────────────────────────────────┤
│  Custom Hooks (useGames, useAuth)       │
├─────────────────────────────────────────┤
│  Services Layer                         │
│  ├─ API Service (RAWG)                  │
│  ├─ Auth Service (Backend)              │
│  └─ Favorites Service (Backend)         │
├─────────────────────────────────────────┤
│  External APIs                          │
│  ├─ RAWG API (Games Data)               │
│  └─ Custom Backend (Auth & Favorites)   │
└─────────────────────────────────────────┘
```

### Flujo de Autenticación

1. Usuario ingresa credenciales en LoginPage/RegisterPage
2. AuthContext gestiona el estado de autenticación
3. AuthApiService envía petición al backend con JWT
4. Token se almacena en localStorage
5. ProtectedRoute verifica autenticación antes de acceder a rutas
6. Todas las peticiones incluyen el token en headers

### Gestión de Estado

- **Context API**: Para autenticación global (AuthContext)
- **Custom Hooks**: Para datos de juegos con caché (useGames, useGenres)
- **LocalStorage**: Persistencia de sesión y token JWT

---

## 📦 Instalación

### Prerrequisitos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- Cuenta en [RAWG API](https://rawg.io/apidocs) para obtener API Key

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/PPereaC/Agon.git
   cd Agon
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_RAWG_API_KEY=tu_api_key_de_rawg
   VITE_RAWG_BASE_URL=https://api.rawg.io/api
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

---

## ⚙️ Configuración

### Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `VITE_RAWG_API_KEY` | API Key de RAWG para obtener datos de juegos | ✅ Sí |
| `VITE_RAWG_BASE_URL` | URL base de la API de RAWG | ❌ No (default: https://api.rawg.io/api) |

### Obtener API Key de RAWG

1. Visita [RAWG API](https://rawg.io/apidocs)
2. Crea una cuenta gratuita
3. Genera tu API Key en el dashboard
4. Copia la key al archivo `.env`

### Backend API

El proyecto utiliza un backend personalizado para autenticación y favoritos:
- **URL Base**: `https://agon.ppereac.dev/api`
- **Autenticación**: JWT Bearer Token
- **Endpoints disponibles**:
  - `POST /auth/register` - Registro de usuario
  - `POST /auth/login` - Inicio de sesión
  - `GET /auth/me` - Datos del usuario actual
  - `GET /auth/users` - Lista de usuarios (admin)
  - `POST /favorites` - Añadir favorito
  - `GET /favorites` - Obtener favoritos
  - `DELETE /favorites/:gameId` - Eliminar favorito

---

## 🚀 Uso

### Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo

# Producción
npm run build            # Compila para producción
npm run preview          # Preview de build de producción

# Calidad de Código
npm run lint             # Ejecuta ESLint

# Despliegue
npm run predeploy        # Prepara archivos para deploy
npm run deploy           # Despliega a GitHub Pages
```

### Navegación de la Aplicación

#### Rutas Públicas
- `/login` - Página de inicio de sesión
- `/registro` - Página de registro de usuario

#### Rutas Protegidas (requieren autenticación)
- `/tendencias` - Juegos en tendencia
- `/novedades` - Últimos lanzamientos
- `/proximamente` - Próximos lanzamientos
- `/top` - Mejores juegos
- `/genero/:genero` - Juegos por género
- `/juego/:id` - Detalles de un juego específico
- `/buscar` - Resultados de búsqueda
- `/perfil` - Perfil del usuario

#### Rutas de Administrador
- `/admin` - Panel de administración (solo admin)

---

## 🔌 API y Servicios

### Servicios Implementados

#### 1. **GamesService** (`games.service.js`)
Gestiona todas las operaciones relacionadas con juegos desde RAWG API:
- `getGames(params)` - Lista de juegos con filtros y paginación
- `getGameDetail(id)` - Detalles completos de un juego
- `getGameScreenshots(id)` - Capturas de pantalla
- `getTrailers(id)` - Videos y trailers
- `getDLCs(id)` - Contenido adicional y DLCs
- `getGenres()` - Lista de géneros disponibles
- `searchGames(params)` - Búsqueda de juegos

#### 2. **AuthApiService** (`authApi.service.js`)
Maneja autenticación con el backend:
- `register(email, password, displayName)` - Registro de usuario
- `login(email, password)` - Inicio de sesión
- `getCurrentUser()` - Obtener usuario actual
- `getUsers()` - Lista de usuarios (admin)
- `logout()` - Cerrar sesión
- `isAuthenticated()` - Verificar autenticación

#### 3. **FavoritesApiService** (`favoritesApi.service.js`)
Gestiona favoritos del usuario:
- `addFavorite(game)` - Añadir juego a favoritos
- `getFavorites()` - Obtener lista de favoritos
- `isFavorite(gameId)` - Verificar si es favorito
- `removeFavorite(gameId)` - Eliminar de favoritos

#### 4. **ApiService** (`api.service.js`)
Servicio base para peticiones HTTP:
- Métodos REST: GET, POST, PUT, PATCH, DELETE
- Manejo automático de headers con JWT
- Gestión de sesión (token y usuario)
- Manejo centralizado de errores

### Custom Hooks

#### **useGames** (`hooks/useGames.js`)
Hooks para consumir datos de juegos con caché:
- `useGames(params)` - Lista de juegos
- `useGameDetail(id)` - Detalles de juego
- `useGameScreenshots(id)` - Screenshots
- `useGameTrailers(id)` - Trailers
- `useGameDLCs(id)` - DLCs

#### **useGenres** (`hooks/useGenres.js`)
Hook para obtener lista de géneros

---

## 🌐 Despliegue

### GitHub Pages

El proyecto está configurado para desplegarse automáticamente en GitHub Pages:

```bash
npm run deploy
```

Este comando:
1. Compila el proyecto (`npm run build`)
2. Copia archivos necesarios (404.html, SVGs)
3. Despliega la carpeta `dist/` a la rama `gh-pages`

**URL de producción**: https://ppereac.github.io/Agon/

### Configuración de GitHub Pages

1. Ve a Settings → Pages en tu repositorio
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `root`
4. Guarda los cambios

### Otras Plataformas

El proyecto es compatible con:
- **Vercel**: Importa el repositorio y despliega
- **Netlify**: Conecta con GitHub y configura build command: `npm run build`
- **Cloudflare Pages**: Similar a Netlify

---

## 📱 PWA - Instalación en Android

AGON es una **Progressive Web App** que puede instalarse en dispositivos Android como una aplicación nativa.

### Características PWA

- ✅ Instalable en pantalla de inicio
- ✅ Funciona offline con caché
- ✅ Actualizaciones automáticas
- ✅ Pantalla completa sin barra del navegador
- ✅ Icono de aplicación personalizado

### Cómo Instalar en Android

#### Opción 1: Desde la Web (Recomendado)

1. Abre Chrome en tu dispositivo Android
2. Visita: https://ppereac.github.io/Agon/
3. Toca el menú (⋮) → "Instalar aplicación" o "Agregar a pantalla de inicio"
4. Confirma la instalación
5. La app aparecerá en tu pantalla de inicio

#### Opción 2: Desarrollo Local

Para probar la PWA localmente en tu dispositivo:

1. Compila el proyecto:
   ```bash
   npm run build
   npm run preview
   ```

2. Usa Chrome Remote Debugging:
   - Conecta tu Android por USB
   - Abre `chrome://inspect` en Chrome desktop
   - Accede a `localhost:4173` desde el móvil

### Más Información

Para instrucciones detalladas sobre la configuración PWA, consulta:
**[INSTRUCCIONES_PWA.md](./INSTRUCCIONES_PWA.md)**

Este documento incluye:
- Configuración completa de PWA
- Personalización de iconos
- Opciones de prueba local
- Troubleshooting

---

## 🤝 Contribuir

Las contribuciones son bienvenidas y apreciadas. Si deseas contribuir:

1. **Fork** el proyecto
2. Crea una **rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### Guías de Contribución

- Sigue el estilo de código existente
- Escribe commits descriptivos
- Actualiza la documentación si es necesario
- Asegúrate de que el código pase el linter (`npm run lint`)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](./LICENSE) para más detalles.

---

## 👨‍💨 Autor

**PPereaC**

- GitHub: [@PPereaC](https://github.com/PPereaC)
- Proyecto: [Agon](https://github.com/PPereaC/Agon)

---

## 🙏 Agradecimientos

- [RAWG](https://rawg.io/) - Por proporcionar la API de videojuegos
- [HeroUI](https://www.heroui.com/) - Por los componentes UI
- [shadcn/ui](https://ui.shadcn.com/) - Por los componentes accesibles
- [Lucide](https://lucide.dev/) - Por los iconos
- Comunidad de React y Vite

---

<div align="center">
  <p>Hecho con ❤️ y ☕</p>
  <p>⭐ Si te gusta el proyecto, dale una estrella en GitHub ⭐</p>
</div>
