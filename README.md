# Journally WEB

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

---

## Introducción:

Aplicación web orienta a la actividad de journally personal.
La propuesta es que el usuario pueda tener una herramienta digital que le permita llevar un registro de su día a día.

### Funcionalidades

- Crear colecciones que contengan entradas. Es decir, agrupar.
- Crear entradas en un díario
- Editar y eliminar colecciones y entradas creadas

---

## Fork repositorio

---

## Instalación

---

## Stack del proyecto:

- Next.js v.15
- Typescript
- Redux Toolkit
- React Tan Stack Query (RTQ)
- Sass

---

## Entornos e Integración

### Scripts disponibles

---

## Arquitectura

````bash
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

````

---

## Configuraciones de formato

### Prettier

### Eslint

## Testing
