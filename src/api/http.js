/** Base URL del backend (Cloud Run). Sin barra final. */
export const API_BASE_URL = import.meta.env.VITE_FIREBASE_FUNCTION_URL;

if (!API_BASE_URL) {
  console.warn(
    "[api] VITE_FIREBASE_FUNCTION_URL no está definida. Revisa tu archivo .env."
  );
}

/**
 * @param {Response} res
 * @returns {Promise<any>}
 */
export async function readJsonBody(res) {
  const json = await res.json();
  if (json && typeof json === "object" && json.success === false) {
    throw new Error(
      json.message || json.error || "La solicitud no tuvo éxito."
    );
  }
  return json;
}
