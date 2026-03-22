import { API_BASE_URL, readJsonBody } from "./http.js";

/**
 * @param {object|null|undefined} raw
 * @returns {object|null}
 */
function transformItem(raw) {
  if (!raw || typeof raw !== "object") return null;
  const id = raw.id ?? raw.show_id ?? raw._id;
  return {
    id,
    show_id: raw.show_id ?? id,
    type: raw.type ?? "",
    title: raw.title ?? "",
    director: raw.director ?? "",
    cast: raw.cast ?? "",
    country: raw.country ?? "",
    date_added: raw.date_added ?? "",
    release_year: raw.release_year ?? "",
    rating: raw.rating ?? "",
    duration: raw.duration ?? "",
    listed_in: raw.listed_in ?? "",
    description: raw.description ?? "",
    createdAt: raw.createdAt ?? null,
  };
}

/**
 * @param {any} raw
 * @returns {object[]}
 */
function transformList(raw) {
  const list = Array.isArray(raw) ? raw : raw?.data ?? raw?.items ?? [];
  if (!Array.isArray(list)) return [];
  return list.map(transformItem).filter(Boolean);
}

const DEFAULT_PAGE_SIZE = 50;

/**
 * Listado paginado: GET {API_BASE_URL}/titles?limit=&startAfter=&startBefore=
 * @param {{ limit?: number, startAfter?: string, startBefore?: string }} opts
 */
export async function fetchTitlesPage({ limit = DEFAULT_PAGE_SIZE, startAfter, startBefore } = {}) {
  const params = new URLSearchParams();
  params.set("limit", String(limit));
  if (startAfter) params.set("startAfter", startAfter);
  if (startBefore) params.set("startBefore", startBefore);
  const res = await fetch(`${API_BASE_URL}/titles?${params}`);
  if (!res.ok) {
    throw new Error(`Error fetching items: ${res.status} ${res.statusText}`);
  }
  const json = await readJsonBody(res);
  return {
    items: transformList(json),
    nextPageToken: json.nextPageToken ?? null,
    prevPageToken: json.prevPageToken ?? null,
    limit: json.limit ?? limit,
  };
}

/** Primera página (compatibilidad). */
export async function fetchItems() {
  const res = await fetchTitlesPage({});
  return res.items;
}

/** GET {API_BASE_URL}/titles/:id */
export async function fetchItemById(id) {
  const res = await fetch(`${API_BASE_URL}/titles/${id}`);
  if (res.status === 404) {
    throw new Error(`No se encontró el título con id "${id}".`);
  }
  if (!res.ok) {
    throw new Error(`Error al cargar el título: ${res.status} ${res.statusText}`);
  }
  const json = await readJsonBody(res);
  const raw = json?.data ?? json;
  const item = transformItem(raw);
  if (!item) {
    throw new Error(`Respuesta inválida para el id "${id}".`);
  }
  return item;
}
