"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Author, AuthorPayload } from "@/types/author";
import { api, AUTHORS_URL } from "@/lib/api";

type Ctx = {
  authors: Author[];
  loading: boolean;
  error: string | null;
  favorites: Set<number>;
  toggleFavorite: (id: number) => void;

  fetchAuthors: () => Promise<void>;
  createAuthor: (p: AuthorPayload) => Promise<void>;
  updateAuthor: (id: number, p: AuthorPayload) => Promise<void>;
  deleteAuthor: (id: number) => Promise<void>;
};

const C = createContext<Ctx | null>(null);

export function AuthorsProvider({ children }: { children: React.ReactNode }) {
  const [authors, setAuthors]   = useState<Author[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string|null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const fetchAuthors = useCallback(async () => {
    try {
      setLoading(true); setError(null);
      const data = await api.get<Author[]>(AUTHORS_URL);
      setAuthors(data ?? []);
    } catch (e:any) { setError(e?.message ?? "Error al cargar autores"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void fetchAuthors(); }, [fetchAuthors]);

  const createAuthor = async (p: AuthorPayload) => { await api.post(AUTHORS_URL, p); await fetchAuthors(); };
  const updateAuthor = async (id:number, p: AuthorPayload) => { await api.put(`${AUTHORS_URL}/${id}`, p); await fetchAuthors(); };
  const deleteAuthor = async (id:number) => { 
    await api.delete(`${AUTHORS_URL}/${id}`); 
    setFavorites(prev => { const n = new Set(prev); n.delete(id); return n; });
    await fetchAuthors(); 
  };

  const toggleFavorite = (id:number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <C.Provider value={{ authors, loading, error, favorites, toggleFavorite,
      fetchAuthors, createAuthor, updateAuthor, deleteAuthor }}>
      {children}
    </C.Provider>
  );
}

export const useAuthorsContext = () => {
  const ctx = useContext(C);
  if (!ctx) throw new Error("useAuthorsContext debe usarse dentro de AuthorsProvider");
  return ctx;
};