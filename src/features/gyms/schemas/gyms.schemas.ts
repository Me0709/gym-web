import { z } from "zod";
import { GYM_STATUS } from "../types/gyms.types";

export const gymInfoSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(100, "El nombre no puede exceder los 100 caracteres"),
  address: z.string().min(1, "La dirección es requerida"),
  status: z.nativeEnum(GYM_STATUS).optional(),
});

export const ownerInfoSchema = z.object({
  ownerDocumentId: z.string().min(1, "El número de identificación es requerido"),
  ownerFirstName: z.string().min(1, "El nombre del dueño es requerido"),
  ownerLastName: z.string().min(1, "El apellido del dueño es requerido"),
  ownerEmail: z.string().email("Email inválido").min(1, "El email del dueño es requerido"),
});

export const gymSchema = gymInfoSchema.merge(ownerInfoSchema);

export type GymFormValues = z.infer<typeof gymSchema>;
