import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";

/**
 * Punto de entrada del enrutador del SPA (vistas).
 *
 * Cada <Route> corresponde a una fila en `routes.config.js` → `SPA_TO_API`.
 * Las páginas usan hooks que llaman a `src/api/index.js`.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/items" element={<ListPage />} />
      <Route path="/items/:id" element={<DetailPage />} />
    </Routes>
  );
}
