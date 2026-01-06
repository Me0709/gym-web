import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type GymFormValues } from "../../../schemas/gyms.schemas";

export const OwnerInfoStep = () => {
  const { control } = useFormContext<GymFormValues>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <FormField
          control={control}
          name="ownerDocumentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Identificación</FormLabel>
              <FormControl>
                <Input placeholder="12345678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="ownerFirstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombres del Dueño</FormLabel>
            <FormControl>
              <Input placeholder="Juan" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="ownerLastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Apellidos del Dueño</FormLabel>
            <FormControl>
              <Input placeholder="Pérez" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="md:col-span-2">
        <FormField
          control={control}
          name="ownerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="dueño@ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
