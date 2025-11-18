# 🪐 Journally WEB

Aplicación web para gestionar un **diario personal digital**, con colecciones y entradas diseñadas para acompañar al usuario en su proceso de escritura, organización y reflexión diaria.

Diseñada con una estética suave, ilustrada y minimalista pensada para sentirse como un pequeño universo personal.

## Indice

- [Introducción](#introducción)
    - [Funcionalidades](#funcionalidades)
- [Clonar el repositorio](#clonar-el-repositorio)
- [Instalación](#instalación)
- [Stack del proyecto](#stack-del-proyecto)
- [Entornos e Integración](#entornos-e-integración)
    - [Scripts disponibles](#scripts-disponibles)
- [Arquitectura](#arquitectura)
- [Instalación](#instalación)
    - [Clonar el repositorio](#clonar-el-repositorio)
- [Configuraciones de formato](#configuraciones-de-formato)
    - [Prettier](#prettier)
    - [ESLint](#eslint)
- [Testing](#testing)
- [Capturas](#capturas)

---

## 📝 Introducción:

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

## 📦 Clonar repositorio

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

2. Crear un archivo _*.env.local*_ con variables de entorno necesarias.

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
API_URL=http://localhost:3001/api
```

3. Ejecutar el servidor

```bash
npm run dev
```

---

## Stack del proyecto:

- Next.js v.15
- Typescript
- Redux Toolkit
- React Query (TanStack Query)
- Sass / SCSS Modules
- NextAuth
- Axios

---

## 🔧 Entornos e Integración

### Scripts disponibles

```json
"scripts": {
  "dev": "dotenvx run --env-file=.env.dev -- next dev --turbopack",
  "production": "dotenvx run --env-file=.env.prod -- next build",
  "build": "next build",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "lint": "next lint"
}
```

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

Archivo _*.prettierrc*_ sugerido:

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

### Eslint

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

A definir. El proyecto está preparado para incorporar Jest + React Testing Library.

## 📸 Capturas

- 🔐 Página de inicio de sesión
[Inicio de sesión](./captions/caption1.png)

- 🗂 Vista general de colecciones
[Colecciones](./captions/caption2.png)

- ✏️ Edición de nombre en colección
[Edición de colección]()

- 📝 Detalle de entrada
[Entradas](./captions/Capture7.png)

- 🗃 Modales y herramientas
[Tools](./captions/capture3.png)
[Tools](./captions/capture4.png)
[Tools](./captions/capture5.png)
[Tools](./captions/capture6.png)

---
