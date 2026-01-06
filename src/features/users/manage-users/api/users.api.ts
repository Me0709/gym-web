import { api } from "@/api";
import type {
  User,
  CreateUserDto,
  CreateClientDto,
  UpdateUserDto,
  AssignRoleDto,
} from "../types/user.types";

/**
 * Servicio API para gestionar usuarios
 */
export const usersApi = {
  // Obtener lista de todos los usuarios
  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>("/users");
    return response.data;
  },

  // Obtener un usuario por ID
  getById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  // Crear nuevo usuario (Admin/Staff)
  create: async (data: CreateUserDto): Promise<User> => {
    const response = await api.post<User>("/users", data);
    return response.data;
  },

  // Registrar nuevo cliente
  createClient: async (data: CreateClientDto): Promise<User> => {
    const response = await api.post<User>("/users/client", data);
    return response.data;
  },

  // Actualizar usuario existente
  update: async (id: number, data: UpdateUserDto): Promise<User> => {
    const response = await api.put<User>(`/users/${id}`, data);
    return response.data;
  },

  // Asignar rol a usuario
  assignRole: async (data: AssignRoleDto): Promise<void> => {
    await api.post("/users/assign-role", data);
  },
};
