/**
 * Punto de entrada único del cliente HTTP hacia el backend.
 *
 * Desde aquí se importan todas las funciones que llaman a la API (hooks, loaders, etc.).
 *
 * | Ruta del SPA (React Router) | Página       | Hook            | Función API      | Backend HTTP        |
 * |----------------------------|--------------|-----------------|------------------|---------------------|
 * | /                          | HomePage     | —               | —                | —                   |
 * | /items                     | ListPage     | useItems        | fetchTitlesPage  | GET /titles         |
 * | /items/:id                 | DetailPage   | useItemDetail   | fetchItemById    | GET /titles/:id     |
 *
 * La tabla detallada vive también en `src/routes.config.js` (SPA_TO_API).
 */

export { API_BASE_URL, readJsonBody } from "./http.js";
export { fetchItems, fetchTitlesPage, fetchItemById } from "./titles.js";
