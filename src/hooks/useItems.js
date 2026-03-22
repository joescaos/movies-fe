import { useState, useEffect, useCallback } from "react";
import { fetchTitlesPage } from "../api";

const PAGE_SIZE = 50;

/**
 * Listado paginado de títulos (startAfter / startBefore del backend).
 */
export function useItems() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);
  const [pageLimit, setPageLimit] = useState(PAGE_SIZE);

  const applyResult = useCallback((res) => {
    setData(res.items);
    setNextPageToken(res.nextPageToken);
    setPrevPageToken(res.prevPageToken);
    setPageLimit(res.limit ?? PAGE_SIZE);
  }, []);

  const load = useCallback(
    async (opts, nextPageIndex) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchTitlesPage({
          limit: PAGE_SIZE,
          startAfter: opts.startAfter,
          startBefore: opts.startBefore,
        });
        applyResult(res);
        setPageIndex(nextPageIndex);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [applyResult]
  );

  useEffect(() => {
    let cancelled = false;

    async function initial() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchTitlesPage({ limit: PAGE_SIZE });
        if (cancelled) return;
        applyResult(res);
        setPageIndex(0);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    initial();
    return () => {
      cancelled = true;
    };
  }, [applyResult]);

  const canGoNext = data.length > 0 && data.length === pageLimit && Boolean(nextPageToken);
  const canGoPrev = pageIndex > 0;

  const goNext = useCallback(() => {
    if (!canGoNext || !nextPageToken) return;
    load({ startAfter: nextPageToken }, pageIndex + 1);
  }, [canGoNext, nextPageToken, pageIndex, load]);

  const goPrev = useCallback(() => {
    if (!canGoPrev || !prevPageToken) return;
    load({ startBefore: prevPageToken }, pageIndex - 1);
  }, [canGoPrev, prevPageToken, pageIndex, load]);

  return {
    data,
    loading,
    error,
    pageIndex,
    pageSize: pageLimit,
    canGoNext,
    canGoPrev,
    goNext,
    goPrev,
  };
}
