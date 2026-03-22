# firebase-app — Scaffolding inicial

## Stack
- React 18 + Vite
- React Router v6
- Fetch API (sin dependencias extra de HTTP)

## Estructura

```
src/
├── App.jsx                   # Routing principal
├── main.jsx                  # Entry point
├── services/
│   └── firebase.js           # ← Único lugar donde vive la lógica del llamado HTTP
├── hooks/
│   ├── useItems.js           # Fetch de la lista completa
│   └── useItemDetail.js      # Fetch de un registro por ID
├── pages/
│   ├── ListPage.jsx          # Vista listado (/items)
│   └── DetailPage.jsx        # Vista detalle (/items/:id)
└── components/
    └── StateViews.jsx        # LoadingState, ErrorState, EmptyState
```

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
| `/`           | —            | Redirige a `/items`          |
| `/items`      | ListPage     | Listado de todos los items   |
| `/items/:id`  | DetailPage   | Detalle de un item por ID    |

## Pendiente (depende del schema de la Firebase Function)

- [ ] Definir los campos reales en `services/firebase.js` → `transformItem()`
- [ ] Actualizar columnas de la tabla en `ListPage.jsx`
- [ ] Actualizar campos del detalle en `DetailPage.jsx`
- [ ] Confirmar si el endpoint de lista y detalle son el mismo o diferentes
- [ ] Confirmar si se requiere autenticación (Firebase Auth token en headers)
- [ ] Agregar estilos / sistema de diseño (Tailwind, CSS Modules, etc.)

## Agregar autenticación (cuando aplique)

En `services/firebase.js`, modificar los headers del fetch:

```js
const res = await fetch(`${BASE_URL}/items`, {
  headers: {
    Authorization: `Bearer ${await getFirebaseToken()}`,
  },
});
```
