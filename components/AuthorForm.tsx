"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorPayloadSchema } from "@/types/author";
import type { AuthorPayload } from "@/types/author";

type Props = {
  defaultValues?: Partial<AuthorPayload>;
  onSubmit: (data: AuthorPayload) => Promise<void>;
  submitLabel?: string;
};

export default function AuthorForm({ defaultValues, onSubmit, submitLabel = "Guardar" }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthorPayload>({
    // resolver: zodResolver(authorPayloadSchema), // ← usa esto si activas Zod
    defaultValues: {
      name: "",
      birthDate: "",
      description: "",
      image: "",
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block font-medium">
          Nombre
        </label>
        <input
          id="name"
          className="w-full border p-2 rounded"
          placeholder="Nombre del autor"
          {...register("name", { required: "Requerido", minLength: { value: 2, message: "Mínimo 2 caracteres" } })}
          aria-invalid={!!errors.name || undefined}
          aria-describedby={errors.name ? "error-name" : undefined}
        />
        {errors.name && (
          <p id="error-name" className="text-red-600 text-sm" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Fecha de nacimiento */}
      <div>
        <label htmlFor="birthDate" className="block font-medium">
          Fecha de nacimiento
        </label>
        <input
          id="birthDate"
          type="date"
          className="w-full border p-2 rounded"
          {...register("birthDate", { required: "Requerido" })}
          aria-invalid={!!errors.birthDate || undefined}
          aria-describedby={errors.birthDate ? "error-birthDate" : undefined}
        />
        {errors.birthDate && (
          <p id="error-birthDate" className="text-red-600 text-sm" role="alert">
            {errors.birthDate.message}
          </p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="description" className="block font-medium">
          Descripción
        </label>
        <textarea
          id="description"
          rows={3}
          className="w-full border p-2 rounded"
          {...register("description", { required: "Requerido", minLength: { value: 10, message: "Mínimo 10 caracteres" } })}
          aria-invalid={!!errors.description || undefined}
          aria-describedby={errors.description ? "error-description" : undefined}
        />
        {errors.description && (
          <p id="error-description" className="text-red-600 text-sm" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* URL de imagen */}
      <div>
        <label htmlFor="image" className="block font-medium">
          URL de imagen
        </label>
        <input
          id="image"
          className="w-full border p-2 rounded"
          placeholder="https://…"
          {...register("image", {
            required: "Requerido",
            validate: (v) => {
              try {
                // validación simple de URL
                new URL(v);
                return true;
              } catch {
                return "URL inválida";
              }
            },
          })}
          aria-invalid={!!errors.image || undefined}
          aria-describedby={errors.image ? "error-image" : undefined}
        />
        {errors.image && (
          <p id="error-image" className="text-red-600 text-sm" role="alert">
            {errors.image.message}
          </p>
        )}
      </div>

      {/* Botón enviar accesible */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
        aria-label={submitLabel}
      >
        {isSubmitting ? "Enviando…" : submitLabel}
      </button>
    </form>
  );
}


