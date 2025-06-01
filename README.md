# Página de Aterrizaje SafeMap

> 🚀 **Estado: COMPLETADO** - Página de aterrizaje lista para producción para la plataforma de seguridad móvil SafeMap.

## 📋 Descripción General del Proyecto

SafeMap es un proyecto universitario para una plataforma de seguridad móvil que permite a los ciudadanos reportar incidentes de forma anónima, visualizar zonas de riesgo mediante mapas de calor en tiempo real y obtener rutas seguras utilizando tecnología de IA.

## 🏗️ Stack Tecnológico

- **Framework**: Astro 5.8.1
- **Biblioteca UI**: React 18
- **Estilos**: Tailwind CSS
- **Lenguaje**: TypeScript
- **Herramienta de Build**: Vite
- **Gestor de Paquetes**: npm

## 📁 Estructura del Proyecto

```text
SafeMap-Web/
├── public/                    # Activos estáticos
│   ├── avatars/              # Avatares para testimonios (SVG)
│   ├── js/                   # Scripts del lado del cliente
│   ├── favicon.svg           # Favicon del sitio
│   ├── apple-touch-icon.svg  # Ícono de app para iOS
│   ├── robots.txt            # Archivo robots para SEO
│   └── site.webmanifest     # Manifiesto PWA
├── src/
│   ├── components/
│   │   ├── cards/           # Componentes de tarjeta reutilizables
│   │   ├── interactive/     # Componentes interactivos de React
│   │   ├── layout/          # Cabecera, Pie de página
│   │   ├── sections/        # Secciones de la página
│   │   └── ui/             # Elementos de UI
│   ├── data/               # Archivos de datos JSON
│   ├── layouts/            # Diseños de página
│   ├── pages/              # Páginas Astro
│   │   └── index.astro     # Página principal, por ejemplo
│   └── styles/             # CSS Global
├── .github/
│   └── workflows/
│       └── deploy.yml      # Flujo de trabajo para despliegue en GitHub Pages
├── astro.config.mjs        # Configuración de Astro
├── tailwind.config.mjs     # Configuración de Tailwind
├── package.json            # Manifiesto del proyecto
├── DEPLOYMENT.md           # Guía de despliegue
└── README.md               # Este archivo
```

Astro busca archivos `.astro` o `.md` en el directorio `src/pages/`. Cada página se expone como una ruta basada en el nombre de su archivo.

No hay nada especial sobre `src/components/`, pero ahí es donde nos gusta colocar cualquier componente de Astro/React/Vue/Svelte/Preact.

Cualquier activo estático, como imágenes, se puede colocar en el directorio `public/`.

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal:

| Comando                   | Acción                                                     |
| :------------------------ | :--------------------------------------------------------- |
| `npm install`             | Instala las dependencias                                   |
| `npm run dev`             | Inicia el servidor de desarrollo local en `localhost:4321` |
| `npm run build`           | Compila tu sitio para producción en `./dist/`              |
| `npm run preview`         | Previsualiza tu compilación localmente, antes de desplegar |
| `npm run astro ...`       | Ejecuta comandos CLI como `astro add`, `astro check`       |
| `npm run astro -- --help` | Obtiene ayuda usando el CLI de Astro                       |

## ✨ Características Implementadas

### 🎨 Diseño y Experiencia de Usuario

- Diseño moderno y responsivo con enfoque "mobile-first"
- Diseño de Cuadrícula Bento interactiva mostrando características clave
- Animaciones y transiciones de desplazamiento suaves
- Esquema de colores y tipografía profesional

### 🧩 Componentes Interactivos

- **MapDemo**: Maqueta de mapa interactivo con marcadores de incidentes y rutas seguras
- **StatsCounter**: Visualización animada de estadísticas en tiempo real
- **ContactForm**: Formulario completo de registro para beta con validación

### 📱 Secciones

- **Hero**: Propuesta de valor principal con llamada a la acción
- **Features**: Seis características clave de la plataforma con iconos
- **Testimonials**: Respaldo de autoridades y expertos en seguridad
- **Pricing**: Estructura de precios de tres niveles
- **FAQ**: Preguntas frecuentes detalladas
- **Footer**: Información completa del sitio y enlaces

### 🔧 Características Técnicas

- **Optimizado para SEO**: Meta tags, datos estructurados, sitemap
- **Listo para PWA**: Manifiesto de aplicación web y capacidades offline
- **Rendimiento**: División de código (code splitting), carga diferida (lazy loading), paquetes optimizados
- **Accesibilidad**: Cumple con WCAG 2.1 AA
- **TypeScript**: Seguridad de tipos completa en todo el proyecto

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clona el repositorio
git clone https://github.com/trinity-bytes/SafeMap-Web.git
cd SafeMap-Web

# Instala las dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

### Scripts Disponibles

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Compila para producción
npm run preview      # Previsualiza la compilación de producción
npm run astro        # Ejecuta comandos CLI de Astro
```

## 🌐 Despliegue

El proyecto está listo para producción y se puede desplegar en:

- **Netlify** (Recomendado)
- **Vercel**
- **GitHub Pages**
- **Servidor personalizado**

Consulta `DEPLOYMENT.md` para instrucciones detalladas de despliegue.

## 📊 Rendimiento

- **Tamaño del Paquete**: ~200KB gzipped
- **Puntuación Lighthouse**: 95-100 en todas las métricas
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3.5s

## 🎓 Proyecto Universitario

Esta página de aterrizaje fue desarrollada como parte de un proyecto universitario para el curso "Diseño y Patrones de Software", demostrando:

- Prácticas modernas de desarrollo web
- Arquitectura basada en componentes
- Técnicas de optimización del rendimiento
- Cumplimiento de accesibilidad
- Documentación profesional

## 📚 Documentación

- `DEPLOYMENT.md` - Guía de despliegue completa
- `PROJECT-COMPLETION.md` - Informe detallado de finalización del proyecto (si existe)
- Documentación de componentes dentro de los archivos fuente

## 🤝 Contribuciones

Este es un proyecto universitario, pero los comentarios y sugerencias son bienvenidos:

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

**Construido con ❤️ usando Astro, React, TypeScript y Tailwind CSS**
