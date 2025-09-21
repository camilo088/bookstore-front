"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Author, AuthorPayload } from "@/types/author";
import { api, AUTHORS_URL } from "@/lib/api";

type AuthorsCtx = {
  authors: Author[];
  loading: boolean;
  error: string | null;
  fetchAuthors: () => Promise<void>;
  createAuthor: (payload: AuthorPayload) => Promise<void>;
  updateAuthor: (id: number, payload: AuthorPayload) => Promise<void>;
  deleteAuthor: (id: number) => Promise<void>;
};

const Ctx = createContext<AuthorsCtx | null>(null);

export function AuthorsProvider({ children }: { children: React.ReactNode }) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuthors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<Author[]>(AUTHORS_URL);
      setAuthors(data ?? []);
    } catch (e: any) {
      setError(e?.message ?? "Error al cargar autores");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchAuthors(); }, [fetchAuthors]);

  const createAuthor = async (payload: AuthorPayload) => {
    await api.post<Author>(AUTHORS_URL, payload);
    await fetchAuthors();
  };

  const updateAuthor = async (id: number, payload: AuthorPayload) => {
    await api.put<Author>(`${AUTHORS_URL}/${id}`, payload);
    await fetchAuthors();
  };

  const deleteAuthor = async (id: number) => {
    await api.delete(`${AUTHORS_URL}/${id}`);
    await fetchAuthors();
  };

  return (
    <Ctx.Provider value={{ authors, loading, error, fetchAuthors, createAuthor, updateAuthor, deleteAuthor }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuthorsContext = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuthorsContext debe usarse dentro de AuthorsProvider");
  return ctx;
}
