"use client";

import Link from "next/link";
import { useAuthors } from "@/hooks/useAuthors";

export default function AuthorList() {
  const { authors, loading, error, deleteAuthor } = useAuthors();

  if (loading) return <p>Cargando…</p>;
  if (error) return <p className="text-red-700">Error: {error}</p>;
  if (!authors.length) return <p>No hay autores. <Link href="/authors/new" className="underline text-blue-600">Crear autor</Link></p>;

  return (
    <ul className="space-y-3">
      {authors.map(a => (
        <li key={a.id} className="border rounded p-3 flex items-center gap-3">
          <img src={a.image} alt={`Foto de ${a.name}`} className="w-12 h-12 rounded object-cover" />
          <div className="flex-1">
            <p className="font-semibold">{a.name}</p>
            <p className="text-sm text-gray-600">{a.birthDate} — {a.description}</p>
          </div>
          <div className="flex gap-2">
            <Link className="px-3 py-1 border rounded" href={`/authors/${a.id}/edit`}>Editar</Link>
            <button
              className="px-3 py-1 border border-red-600 text-red-600 rounded"
              onClick={() => a.id && deleteAuthor(a.id)}
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
