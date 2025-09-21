"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import AuthorForm from "@/components/AuthorForm";
import { useAuthors } from "@/hooks/useAuthors";
import type { AuthorPayload } from "@/types/author";

export default function EditAuthorPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const router = useRouter();
  const { authors, updateAuthor } = useAuthors();

  const current = useMemo(() => authors.find(a => a.id === id), [authors, id]);
  if (!current) return <p>Cargando autor… (o no existe)</p>;

  async function handleUpdate(values: AuthorPayload) {
    await updateAuthor(id, values);
    router.push("/authors");
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-blue-600">Editar autor</h2>
      <AuthorForm
        defaultValues={{
          name: current.name,
          birthDate: current.birthDate,
          description: current.description,
          image: current.image,
        }}
        onSubmit={handleUpdate}
        submitLabel="Guardar cambios"
      />
    </>
  );
}
