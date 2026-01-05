import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gymSchema, type GymFormValues } from "../../schemas/gyms.schemas";
import { type Gym, GYM_STATUS } from "../../types/gyms.types";

interface UseGymFormProps {
  initialData?: Gym | null;
  onSubmit: (data: GymFormValues) => void;
}

export const useGymForm = ({ initialData, onSubmit }: UseGymFormProps) => {
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

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
