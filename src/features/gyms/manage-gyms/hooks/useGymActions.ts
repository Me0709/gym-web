import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGymMutations } from "./useGymMutations";
import { gymKeys } from "../../queryKeys";
import { type Gym } from "../../types/gyms.types";
import { type GymFormValues } from "../../schemas/gyms.schemas";

export const useGymActions = () => {
  const queryClient = useQueryClient();
  const { createGym, updateGym, deleteGym } = useGymMutations();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [gymIdToDelete, setGymIdToDelete] = useState<string | null>(null);

  const handleCreate = () => {
    setSelectedGym(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (gym: Gym) => {
    setSelectedGym(gym);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setGymIdToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!gymIdToDelete) return;

    deleteGym.mutate(gymIdToDelete, {
      onSuccess: () => {
        setIsConfirmOpen(false);
        setGymIdToDelete(null);
        queryClient.invalidateQueries({ queryKey: gymKeys.lists() });
        toast.success("Gimnasio eliminado correctamente");
      },
      onError: () => {
        setIsConfirmOpen(false);
      },
    });
  };

  const handleSubmit = (data: GymFormValues) => {
    if (selectedGym) {
      updateGym.mutate(
        { id: selectedGym.id, data },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            queryClient.invalidateQueries({ queryKey: gymKeys.lists() });
            toast.success("Gimnasio actualizado correctamente");
          },
        }
      );
    } else {
      createGym.mutate(data, {
        onSuccess: () => {
          setIsDialogOpen(false);
          queryClient.invalidateQueries({ queryKey: gymKeys.lists() });
          toast.success("Gimnasio creado correctamente");
        },
      });
    }
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    selectedGym,
    isConfirmOpen,
    setIsConfirmOpen,
    handleCreate,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSubmit,
    isLoading: createGym.isPending || updateGym.isPending || deleteGym.isPending,
  };
};
