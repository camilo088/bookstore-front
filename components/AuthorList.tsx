"use client";
import Link from "next/link";
import { useAuthors } from "@/hooks/useAuthors";

type Props = { onlyFavorites?: boolean };

export default function AuthorList({ onlyFavorites = false }: Props) {
  const { authors, loading, error, deleteAuthor, favorites, toggleFavorite } = useAuthors();

  if (loading) return <p>Cargando…</p>;
  if (error)   return <p className="text-red-700" role="alert">Error: {error}</p>;

  const list = onlyFavorites ? authors.filter(a => a.id && favorites.has(a.id)) : authors;
  if (!list.length) {
    return (
      <p>
        {onlyFavorites ? "No hay favoritos." : "No hay autores."}{" "}
        {!onlyFavorites && <Link className="text-blue-600 underline" href="/authors/new">Crear autor</Link>}
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {list.map(a => {
        const fav = a.id ? favorites.has(a.id) : false;
        return (
          <li key={a.id} className="border rounded p-3 flex items-center gap-3">
            <img src={a.image} alt={`Foto de ${a.name}`} className="w-12 h-12 rounded object-cover" />
            <div className="flex-1">
              <p className="font-semibold flex items-center gap-2">
                {a.name}
                {fav && <span className="inline-block text-yellow-600" aria-hidden>★</span>}
              </p>
              <p className="text-sm text-gray-600">{a.birthDate} — {a.description}</p>
            </div>

            {/* Botón favoritos accesible */}
            <button
              className={`px-3 py-1 rounded border ${fav ? "bg-yellow-100 border-yellow-600" : ""}`}
              aria-pressed={fav}
              aria-label={fav ? "Quitar de favoritos" : "Marcar como favorito"}
              onClick={() => a.id && toggleFavorite(a.id)}
            >
              {fav ? "★ Favorito" : "☆ Favorito"}
            </button>

            <div className="flex gap-2">
              <Link className="px-3 py-1 rounded border" href={`/authors/${a.id}/edit`} aria-label={`Editar a ${a.name}`}>Editar</Link>
              <button
                className="px-3 py-1 rounded border border-red-600 text-red-600"
                onClick={() => a.id && deleteAuthor(a.id)}
                aria-label={`Eliminar a ${a.name}`}
              >
                Eliminar
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
