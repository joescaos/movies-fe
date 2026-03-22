// components/StateViews.jsx
// Reusable components for loading, error, and empty states.

export function LoadingState({ message = "Cargando..." }) {
  return (
    <div className="state-view loading-state">
      <div className="spinner" aria-label="Cargando" />
      <p>{message}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-view error-state" role="alert">
      <span className="state-icon">⚠️</span>
      <p>{message || "Ocurrió un error inesperado."}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-secondary">
          Reintentar
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message = "No hay registros para mostrar." }) {
  return (
    <div className="state-view empty-state">
      <span className="state-icon">📭</span>
      <p>{message}</p>
    </div>
  );
}
