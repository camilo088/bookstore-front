
export interface Author {
  id: number;
  name: string;
  birthDate: string;      // yyyy-mm-dd
  description: string;
  image: string;          // URL
}

/** Para crear/editar (sin id obligatorio) */
export interface AuthorPayload {
  name: string;
  birthDate: string;
  description: string;
  image: string;
}

export interface ApiError {
  status: number;
  message: string;
}

import { z } from "zod";
export const authorPayloadSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD"),
  description: z.string().min(10, "Mínimo 10 caracteres"),
  image: z.string().url("URL válida"),
});