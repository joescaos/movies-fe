/**
 * Mapa explícito: rutas del navegador ↔ piezas de la app ↔ HTTP del backend.
 * Mantener alineado con `AppRoutes` en `src/appRouter.jsx` y con `src/api/index.js`.
 */

export const SPA_TO_API = [
  {
    spaPath: "/",
    note: "Página de inicio (sin llamada API)",
    page: "HomePage",
    hook: null,
    apiFunction: null,
    backendHttp: null,
  },
  {
    spaPath: "/items",
    page: "ListPage",
    hook: "useItems",
    apiFunction: "fetchTitlesPage",
    backendHttp: "GET {API_BASE_URL}/titles?limit&startAfter&startBefore",
  },
  {
    spaPath: "/items/:id",
    page: "DetailPage",
    hook: "useItemDetail",
    apiFunction: "fetchItemById",
    backendHttp: "GET {API_BASE_URL}/titles/:id",
  },
];
