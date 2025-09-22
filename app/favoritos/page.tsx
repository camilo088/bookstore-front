import AuthorList from "@/components/AuthorList";

export default function FavoritosPage() {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Favoritos</h2>
      <AuthorList onlyFavorites />
    </>
  );
}