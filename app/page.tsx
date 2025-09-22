import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-3xl font-bold">Preparcial: CRUD de Autores</h1>
      <p>
        Ir a la <Link className="underline text-blue-600" href="/authors">lista</Link> o{" "}
        <Link className="underline text-blue-600" href="/authors/new">crear</Link> un autor.
      </p>
    </div>
  );
}
