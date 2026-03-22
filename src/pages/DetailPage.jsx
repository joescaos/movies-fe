// pages/DetailPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useItemDetail } from "../hooks/useItemDetail";
import { LoadingState, ErrorState } from "../components/StateViews";

function formatFirestoreDate(ts) {
  if (!ts || typeof ts._seconds !== "number") return "—";
  return new Date(ts._seconds * 1000).toLocaleString("es");
}

const DETAIL_FIELDS = [
  ["show_id", "Show ID"],
  ["type", "Tipo"],
  ["title", "Título"],
  ["director", "Director"],
  ["cast", "Reparto"],
  ["country", "País"],
  ["date_added", "Fecha en catálogo"],
  ["release_year", "Año"],
  ["rating", "Clasificación"],
  ["duration", "Duración"],
  ["listed_in", "Listado en"],
  ["description", "Descripción"],
];

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: item, loading, error } = useItemDetail(id);

  if (loading) return <LoadingState message="Cargando registro..." />;
  if (error) return <ErrorState message={error} onRetry={() => navigate(0)} />;

  return (
    <main className="page detail-page">
      <button className="btn btn-ghost" onClick={() => navigate("/items")}>
        ← Volver al listado
      </button>

      <header className="page-header">
        <h1>{item.title || "Detalle"}</h1>
        <span className="badge">ID: {id}</span>
      </header>

      <section className="detail-card">
        {item &&
          DETAIL_FIELDS.map(([key, label]) => (
            <div className="detail-row" key={key}>
              <span className="detail-label">{label}</span>
              <span className="detail-value">
                {String(item[key] ?? "—")}
              </span>
            </div>
          ))}
        {item && (
          <div className="detail-row">
            <span className="detail-label">Creado (servidor)</span>
            <span className="detail-value">{formatFirestoreDate(item.createdAt)}</span>
          </div>
        )}
      </section>
    </main>
  );
}
