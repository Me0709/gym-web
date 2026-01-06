/**
 * Definiciones de tipos para el módulo de usuarios
 * Basado en las respuestas JSON del backend
 */

export interface ClientProfile {
  id: number;
  userId: number;
  photoUrl?: string;
  birthdate: string; // ISO Date string
  healthInfo?: string;
  goals?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  documentId: string;
  userName: string;
  firstName: string;
  lastName: string;
  twoFactorEnabled: boolean;
  isSuperAdmin: boolean;
  status: "active" | "inactive" | "suspended"; // Asumiendo posibles estados
  createdAt: string;
  updatedAt: string;
  client?: ClientProfile; // Relación opcional si el usuario es cliente
}

// DTO para crear usuario (Admin/Staff)
export interface CreateUserDto {
  email: string;
  documentId: string;
  userName: string;
  password?: string; // Opcional si se genera automáticamente o se envía después
  firstName: string;
  lastName: string;
  twoFactorEnabled?: boolean;
}

// DTO para registrar un cliente
export interface CreateClientDto extends CreateUserDto {
  photoUrl?: string;
  birthdate: string;
  healthInfo?: string;
  goals?: string;
  notes?: string;
}

// DTO para actualizar usuario
// Extendemos Partial<CreateClientDto> y añadimos status opcional
export type UpdateUserDto = Partial<CreateClientDto> & {
  status?: "active" | "inactive" | "suspended";
};

// DTO para asignar roles
export interface AssignRoleDto {
  userId: number;
  gymId: number;
  roleId: number;
}
