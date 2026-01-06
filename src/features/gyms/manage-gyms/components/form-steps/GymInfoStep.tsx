import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type GymFormValues } from "../../../schemas/gyms.schemas";
import { GYM_STATUS } from "../../../types/gyms.types";

interface GymInfoStepProps {
  isEdit: boolean;
}

export const GymInfoStep = ({ isEdit }: GymInfoStepProps) => {
  const { control } = useFormContext<GymFormValues>();
  
  return (
    <div className="space-y-4">
      <FormField
        control={control}
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
        control={control}
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

      {isEdit && (
        <FormField
          control={control}
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
    </div>
  );
};
