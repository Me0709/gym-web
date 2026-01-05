import { z } from "zod";
import { GYM_STATUS } from "../types/gyms.types";

export const gymSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(100, "El nombre no puede exceder los 100 caracteres"),
  address: z.string().min(1, "La dirección es requerida"),
  status: z.nativeEnum(GYM_STATUS).optional(),
});

export type GymFormValues = z.infer<typeof gymSchema>;
