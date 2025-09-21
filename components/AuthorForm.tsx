"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AuthorPayload } from "@/types/author";
import { authorPayloadSchema } from "@/types/author"; // si no usas Zod, elimina esta línea

type Props = {
  defaultValues?: Partial<AuthorPayload>;
  onSubmit: (data: AuthorPayload) => Promise<void>;
  submitLabel?: string;
};

export default function AuthorForm({ defaultValues, onSubmit, submitLabel = "Guardar" }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuthorPayload>({
    resolver: zodResolver(authorPayloadSchema), // quita esta línea si no usas Zod
    defaultValues: {
      name: "",
      birthDate: "",
      description: "",
      image: "",
      ...defaultValues,
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
      <div>
        <label className="block font-medium">Nombre</label>
        <input className="w-full border p-2 rounded" {...register("name")} placeholder="Nombre del autor" />
        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block font-medium">Fecha de nacimiento</label>
        <input type="date" className="w-full border p-2 rounded" {...register("birthDate")} />
        {errors.birthDate && <p className="text-red-600 text-sm">{errors.birthDate.message}</p>}
      </div>
      <div>
        <label className="block font-medium">Descripción</label>
        <textarea rows={3} className="w-full border p-2 rounded" {...register("description")} />
        {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
      </div>
      <div>
        <label className="block font-medium">URL de imagen</label>
        <input className="w-full border p-2 rounded" {...register("image")} placeholder="https://…" />
        {errors.image && <p className="text-red-600 text-sm">{errors.image.message}</p>}
      </div>

      <button disabled={isSubmitting} className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50">
        {isSubmitting ? "Enviando…" : submitLabel}
      </button>
    </form>
  );
}
