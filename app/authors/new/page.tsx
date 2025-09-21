"use client";

import { useRouter } from "next/navigation";
import AuthorForm from "@/components/AuthorForm";
import { useAuthors } from "@/hooks/useAuthors";
import type { AuthorPayload } from "@/types/author";

export default function NewAuthorPage() {
  const router = useRouter();
  const { createAuthor } = useAuthors();

  async function handleCreate(values: AuthorPayload) {
    await createAuthor(values);
    router.push("/authors");
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Crear autor</h2>
      <AuthorForm onSubmit={handleCreate} submitLabel="Crear" />
    </>
  );
}
