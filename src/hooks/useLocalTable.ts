import { useCallback, useEffect, useState } from "react";

export type Row = Record<string, any> & { id: string };

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = window.localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch { return fallback; }
}

export function useLocalTable<T extends Row>(key: string, seed: T[] = []) {
  const [rows, setRows] = useState<T[]>(seed);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRows(load<T[]>(key, seed));
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    try { window.localStorage.setItem(key, JSON.stringify(rows)); } catch {}
  }, [key, rows, ready]);

  const add = useCallback((row: Omit<T, "id"> & { id?: string }) => {
    setRows((r) => [...r, { ...(row as any), id: row.id ?? crypto.randomUUID() }]);
  }, []);
  const update = useCallback((id: string, patch: Partial<T>) => {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }, []);
  const remove = useCallback((id: string) => {
    setRows((r) => r.filter((x) => x.id !== id));
  }, []);

  return { rows, setRows, add, update, remove, ready };
}

export async function fileToData(file: File): Promise<{ name: string; type: string; size: number; data: string }> {
  const data: string = await new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result as string);
    fr.onerror = rej;
    fr.readAsDataURL(file);
  });
  return { name: file.name, type: file.type, size: file.size, data };
}
