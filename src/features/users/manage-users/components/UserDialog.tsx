import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateUser, useCreateClient, useUpdateUser } from "../hooks/users.hooks";
import type { User } from "../types/user.types";

// Schema de validación para Usuario
const userSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  userName: z.string().min(4, "El usuario debe tener al menos 4 caracteres"),
  documentId: z.string().min(5, "Documento requerido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").optional().or(z.literal("")),
  status: z.enum(["active", "inactive", "suspended"]).optional(),
  // Campos específicos de cliente (opcionales por defecto, requeridos si es cliente)
  photoUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  birthdate: z.string().optional(),
  healthInfo: z.string().optional(),
  goals: z.string().optional(),
  notes: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserDialogProps {
  userToEdit?: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "admin" | "client"; // Modo de creación
}

export function UserDialog({ userToEdit, open, onOpenChange, mode = "admin" }: UserDialogProps) {
  // Determinar si estamos modo cliente:
  // Si editamos: depende de si el usuario tiene perfil 'client'.
  // Si creamos: depende del prop 'mode'.
  const isClientMode = userToEdit ? !!userToEdit.client : mode === "client";
  
  const createUser = useCreateUser();
  const createClient = useCreateClient();
  const updateUser = useUpdateUser();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      documentId: "",
      password: "",
      status: "active",
      photoUrl: "",
      birthdate: "",
      healthInfo: "",
      goals: "",
      notes: "",
    },
  });

  // Actualizar formulario al editar
  useEffect(() => {
    if (userToEdit) {
      form.reset({
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        email: userToEdit.email,
        userName: userToEdit.userName,
        documentId: userToEdit.documentId,
        password: "", // No mostramos password al editar
        status: userToEdit.status,
        photoUrl: userToEdit.client?.photoUrl || "",
        birthdate: userToEdit.client?.birthdate ? new Date(userToEdit.client.birthdate).toISOString().split('T')[0] : "",
        healthInfo: userToEdit.client?.healthInfo || "",
        goals: userToEdit.client?.goals || "",
        notes: userToEdit.client?.notes || "",
      });
    } else {
      form.reset({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        documentId: "",
        password: "",
        status: "active",
        photoUrl: "",
        birthdate: "",
        healthInfo: "",
        goals: "",
        notes: "",
      });
    }
  }, [userToEdit, open, form]);

  const onSubmit = async (values: UserFormValues) => {
    try {
      if (userToEdit) {
        // Actualizar
        // Eliminar password si está vacío para evitar enviarlo
        const updateData: Partial<UserFormValues> = { ...values };
        if (!updateData.password) {
          delete updateData.password;
        }

        await updateUser.mutateAsync({
          id: userToEdit.id,
          data: updateData,
        });
      } else {
        // Crear
        if (isClientMode) {
          if (!values.password) {
            form.setError("password", { message: "Contraseña requerida para crear" });
            return;
          }

          await createClient.mutateAsync({
            ...values,
            password: values.password,
            // Asegurar tipos para campos opcionales
            photoUrl: values.photoUrl || undefined,
            birthdate: values.birthdate || new Date().toISOString(), // Fallback simple
            healthInfo: values.healthInfo || undefined,
            goals: values.goals || undefined,
            notes: values.notes || undefined,
            twoFactorEnabled: false
          });
        } else {
          if (!values.password) {
            form.setError("password", { message: "Contraseña requerida para crear" });
            return;
          }
          await createUser.mutateAsync({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            userName: values.userName,
            documentId: values.documentId,
            password: values.password,
            twoFactorEnabled: false
          });
        }
      }
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  const isPending = createUser.isPending || createClient.isPending || updateUser.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{userToEdit ? "Editar Usuario" : isClientMode ? "Registrar Cliente" : "Crear Usuario"}</DialogTitle>
          <DialogDescription>
            {userToEdit ? "Modifica los datos del usuario aquí." : "Ingresa la información para el nuevo registro."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Perez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

             <div className="grid grid-cols-2 gap-4">
               {/* ... (email y doc ID igual) ... */}
               <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="juan@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="documentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Documento ID</FormLabel>
                    <FormControl>
                      <Input placeholder="12345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="juanperez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{userToEdit ? "Nueva Contraseña (Opcional)" : "Contraseña"}</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Campo Estatus solo en edición */}
            {userToEdit && (
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="inactive">Inactivo</SelectItem>
                        <SelectItem value="suspended">Suspendido</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Campos Específicos de Cliente */}
            {isClientMode && (
              <div className="border-t pt-4 mt-6 space-y-4">
                <h4 className="text-sm font-semibold tracking-tight">Información de Cliente</h4>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="birthdate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Nacimiento</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="photoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Foto URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="goals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Objetivos</FormLabel>
                        <FormControl>
                          <Input placeholder="Perder peso, ganar masa..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="healthInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salud</FormLabel>
                        <FormControl>
                          <Input placeholder="Alergias, condiciones..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notas</FormLabel>
                      <FormControl>
                        <Input placeholder="Preferencias..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="flex justify-end gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Guardando..." : userToEdit ? "Actualizar" : "Crear"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
