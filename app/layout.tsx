import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { AuthorsProvider } from "@/context/AuthorsProvider";

export const metadata: Metadata = { title: "CRUD Autores" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="text-gray-900">
        <AuthorsProvider>
          <header className="border-b p-4 flex gap-4">
            <Link href="/authors" className="font-semibold">Autores</Link>
            <Link href="/authors/new" className="font-semibold">Crear</Link>
            <Link href="/favoritos" className="font-semibold">Favoritos</Link>
          </header>
          <main className="max-w-4xl mx-auto p-6">{children}</main>
        </AuthorsProvider>
      </body>
    </html>
  );
}
