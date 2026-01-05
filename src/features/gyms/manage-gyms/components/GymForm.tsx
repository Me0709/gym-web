import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gymSchema, type GymFormValues } from "../../schemas/gyms.schemas";
import { type Gym, GYM_STATUS } from "../../types/gyms.types";

interface GymFormProps {
  onSubmit: (data: GymFormValues) => void;
  initialData?: Gym | null;
  isLoading?: boolean;
  onCancel?: () => void;
}

export function GymForm({ onSubmit, initialData, isLoading, onCancel }: GymFormProps) {
  const form = useForm<GymFormValues>({
    resolver: zodResolver(gymSchema),
    defaultValues: {
      name: "",
      address: "",
      status: GYM_STATUS.ACTIVE,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        address: initialData.address,
        status: initialData.status,
      });
    } else {
      form.reset({
        name: "",
        address: "",
        status: GYM_STATUS.ACTIVE,
      });
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Gimnasio</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Iron Gym" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder="Calle 123, Ciudad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {initialData && (
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={GYM_STATUS.ACTIVE}>Activo</SelectItem>
                    <SelectItem value={GYM_STATUS.EXPIRED}>Expirado</SelectItem>
                    <SelectItem value={GYM_STATUS.DELETED}>Eliminado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end gap-3 pt-6">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : initialData ? "Actualizar" : "Crear Gimnasio"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

