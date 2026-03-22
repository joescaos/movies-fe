# firebase-app — Frontend

## Stack
- React 18 + Vite
- React Router v6
- Fetch API (sin dependencias extra de HTTP)

## Setup

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL de tu Firebase Function

# 3. Correr en desarrollo
npm run dev
```

## Rutas

| Ruta          | Componente   | Descripción                  |
|---------------|--------------|------------------------------|
| `/`           | HomePage     | Página de inicio             |
| `/items`      | ListPage     | Listado de todos los items   |
| `/items/:id`  | DetailPage   | Detalle de un item por ID    |


