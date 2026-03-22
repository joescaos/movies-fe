// pages/ListPage.jsx
import { useNavigate } from "react-router-dom";
import { useItems } from "../hooks/useItems";
import { LoadingState, ErrorState, EmptyState } from "../components/StateViews";

export default function ListPage() {
  const {
    data: items,
    loading,
    error,
    pageIndex,
    canGoNext,
    canGoPrev,
    goNext,
    goPrev,
  } = useItems();
  const navigate = useNavigate();

  if (loading) return <LoadingState message="Cargando registros..." />;
  if (error) return <ErrorState message={error} />;
  if (!items.length) return <EmptyState />;

  return (
    <main className="page list-page">
      <header className="page-header">
        <h1>Títulos</h1>
        <span className="badge">
          Página {pageIndex + 1} · {items.length} en esta página
        </span>
      </header>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Tipo</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title || "—"}</td>
              <td>{item.type || "—"}</td>
              <td>{item.release_year || "—"}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/items/${item.id}`)}
                >
                  Ver detalle →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="list-pagination" aria-label="Paginación del listado">
        <button
          type="button"
          className="btn btn-secondary"
          disabled={!canGoPrev}
          onClick={goPrev}
        >
          ← Anterior
        </button>
        <span className="list-pagination-meta">Página {pageIndex + 1}</span>
        <button
          type="button"
          className="btn btn-secondary"
          disabled={!canGoNext}
          onClick={goNext}
        >
          Siguiente →
        </button>
      </nav>
    </main>
  );
}
