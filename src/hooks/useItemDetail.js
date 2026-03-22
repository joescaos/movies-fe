// hooks/useItemDetail.js
import { useState, useEffect } from "react";
import { fetchItemById } from "../api";

/**
 * Hook to fetch a single item by ID.
 * @param {string|number} id
 * @returns {{ data: object|null, loading: boolean, error: string|null }}
 */
export function useItemDetail(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const item = await fetchItemById(id);
        if (!cancelled) setData(item);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [id]);

  return { data, loading, error };
}
