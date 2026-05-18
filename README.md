# 🪐 Journally WEB

Aplicación web para gestionar un **diario personal digital**, con colecciones y entradas diseñadas para acompañar al usuario en su proceso de escritura, organización y reflexión diaria.

Diseñada con una estética suave, ilustrada y minimalista pensada para sentirse como un pequeño universo personal.

## Índice

- [Introducción](#introducción)
    - [Funcionalidades](#funcionalidades)
- [Clonar el repositorio](#clonar-el-repositorio)
- [Instalación](#instalación)
- [Stack del proyecto](#stack-del-proyecto)
- [Entornos e Integración](#entornos-e-integración)
    - [Variables de entorno](#variables-de-entorno)
    - [Scripts disponibles](#scripts-disponibles)
- [Despliegue](#despliegue)
- [Arquitectura](#arquitectura)
- [Configuraciones de formato](#configuraciones-de-formato)
    - [Prettier](#prettier)
    - [ESLint](#eslint)
- [Testing](#testing)
- [Capturas](#capturas)

---

## 📝 Introducción

**Journally WEB** es una aplicación enfocada en la práctica del journaling personal. El objetivo es ofrecer al usuario una herramienta amigable, simple y estética para registrar su día a día y organizar sus pensamientos a través de colecciones y entradas.

### Funcionalidades

✔️ Crear colecciones

✔️ Crear entradas dentro de una colección

✔️ Editar nombres de colecciones y entradas

✔️ Eliminar elementos

✔️ Navegación clara entre secciones

✔️ UI intuitiva con tooltips, modales y feedback visual

### Diseño

La aplicación utiliza un estilo:

- Cálido y suave

- Tipografía manuscrita

- Ilustraciones espaciales personalizadas

- Interfaz amigable y centrada en la experiencia del usuario

- Componentes redondeados, tonos pasteles y colores vibrantes para estados de acción

**_(Inspirado en un pequeño universo personal ✨)_**

---

## 📦 Clonar el repositorio

```bash
git clone https://github.com/<tu-usuario>/<repo>.git
cd journally-web
```

---

## 🛠 Instalación

1. Instalar dependencias

```bash
npm install
```

2. Crear un archivo `.env.dev` a partir de `.env.example`.

```bash
cp .env.example .env.dev
```

3. Completar las variables necesarias para tu entorno local.

4. Ejecutar el servidor

```bash
npm run dev
```

---

## Stack del proyecto

- Next.js v.15
- Typescript
- Redux Toolkit
- React Query (TanStack Query)
- Sass / SCSS Modules
- NextAuth
- Axios

---

## 🔧 Entornos e integración

### Variables de entorno

El repositorio incluye `.env.example` como plantilla segura para documentar las variables requeridas sin exponer credenciales reales.

- `.env.dev` se usa para desarrollo local.
- `.env.prod` se usa para builds locales de producción.
- Los archivos con valores reales no deben subirse al repositorio.

Variables esperadas:

| Variable | Uso |
| --- | --- |
| `APP_ENV` | Entorno lógico de la aplicación, por ejemplo `development` o `production`. |
| `NEXT_PUBLIC_APP_URL` | URL pública del frontend. |
| `NEXT_PUBLIC_API_URL` | URL pública de la API consumida por el frontend. |
| `NEXTAUTH_URL` | URL base usada por NextAuth. |
| `NEXTAUTH_SECRET` | Secreto usado por NextAuth. Debe definirse con un valor seguro fuera del repositorio. |
| `NEXT_PUBLIC_APP_VERSION` | Versión pública de la aplicación. |

> Las variables con prefijo `NEXT_PUBLIC_` pueden quedar expuestas al navegador. No deben contener secretos.

### Scripts disponibles

```json
"scripts": {
  "dev": "dotenvx run --env-file=.env.dev -- next dev --turbopack",
  "production": "dotenvx run --env-file=.env.prod -- next build",
  "build": "next build",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "test:ci": "jest --runInBand --watchman=false",
  "lint": "eslint \"src/**/*.{js,jsx,ts,tsx}\""
}
```

---

## 🚀 Despliegue

El frontend puede desplegarse en Vercel conectando el repositorio al proyecto correspondiente.

- Vercel debe tomar las variables de entorno desde la configuración del proyecto, no desde archivos `.env` versionados.
- Los valores sensibles, como `NEXTAUTH_SECRET`, deben cargarse directamente en el proveedor de despliegue.
- El build de producción usa el comando estándar:

```bash
next build
```

Para mantener el repositorio apto para publicación:

- conserva únicamente `.env.example` bajo control de versiones;
- no publiques tokens, secretos ni IDs de proveedor;
- documenta solo los nombres de las variables necesarias, no sus valores reales.

---

## 🧱 Arquitectura

```bash
src/
├── app
│   ├── api
│   │   ├── auth
│   │   │   └── [...nextauth]
│   │   └── provider
│   ├── collection
│   │   └── [id]
│   ├── entries
│   │   └── [id]
│   ├── home
│   │   └── components
│   └── login
│       └── components
├── commons
│   ├── Buttons
│   ├── Cards
│   ├── Dropdowns
│   ├── Editor
│   ├── EmptyStates
│   ├── Footer
│   ├── Ilustrations
│   ├── InfinteScroll
│   ├── Inputs
│   ├── Modals
│   ├── Navbar
│   ├── NotFound
│   ├── Sidebar
│   ├── Skeletons
│   ├── Spinner
│   ├── Tabs
│   ├── Title
│   ├── Toast
│   └── Tooltip
├── config
├── hooks
├── services
├── store
├── styles
│   └── icons
└── utils
```

---

## 🧹 Configuraciones de formato

### Prettier

Archivo `.prettierrc` sugerido:

```json
{
    "singleQuote": true,
    "semi": true,
    "tabWidth": 2,
    "printWidth": 100,
    "trailingComma": "es5"
}
```

---

### ESLint

```json
{
    "extends": [
        "next/core-web-vitals",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ]
}
```

## 🧪 Testing

El proyecto usa Jest para pruebas automatizadas.

```bash
npm test
npm run test:coverage
```

## 📸 Capturas

- 🔐 Página de inicio de sesión  
  ![Inicio de sesión](./captions/caption1.png)

- 🗂 Vista general de colecciones  
  ![Colecciones](./captions/caption2.png)

- ✏️ Edición de nombre en colección

- 📝 Detalle de entrada  
  ![Entradas](./captions/Capture7.png)

- 🗃 Modales y herramientas  
  ![Tools](./captions/capture3.png)
  ![Tools](./captions/capture4.png)
  ![Tools](./captions/capture5.png)
  ![Tools](./captions/capture6.png)

---
