import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../api/users.api";
import type {
  CreateUserDto,
  CreateClientDto,
  UpdateUserDto,
  AssignRoleDto,
} from "../types/user.types";
import { toast } from "sonner"; // Usamos sonner para notificaciones, asumiendo que está instalado por package.json
import { AxiosError } from "axios";

/**
 * Hooks de React Query para gestión de usuarios
 */

// Claves de consulta para invalidación de caché
export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  detail: (id: number) => [...userKeys.all, "detail", id] as const,
};

// Hook para obtener usuarios
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: usersApi.getAll,
  });
};

// Hook para obtener un usuario detalle
export const useUser = (id: number) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => usersApi.getById(id),
    enabled: !!id, // Solo ejecutar si hay ID
  });
};

// Hook para crear usuario
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDto) => usersApi.create(data),
    onSuccess: () => {
      toast.success("Usuario creado exitosamente");
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Error al crear usuario");
    },
  });
};

// Hook para registrar cliente
export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClientDto) => usersApi.createClient(data),
    onSuccess: () => {
      toast.success("Cliente registrado exitosamente");
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || "Error al registrar cliente"
      );
    },
  });
};

// Hook para actualizar usuario
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserDto }) =>
      usersApi.update(id, data),
    onSuccess: (data) => {
      toast.success("Usuario actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(data.id) });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || "Error al actualizar usuario"
      );
    },
  });
};

// Hook para asignar rol
export const useAssignRole = () => {
  return useMutation({
    mutationFn: (data: AssignRoleDto) => usersApi.assignRole(data),
    onSuccess: () => {
      toast.success("Rol asignado correctamente");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Error al asignar rol");
    },
  });
};
