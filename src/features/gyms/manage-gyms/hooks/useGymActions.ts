import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGymMutations } from "./useGymMutations";
import { gymKeys } from "../../queryKeys";
import { type GymWithOwner } from "../../types/gyms.types";
import { type GymFormValues } from "../../schemas/gyms.schemas";

import { useApiErrorHandler } from "@/common/hooks/useApiErrorHandler";

export const useGymActions = () => {
  const queryClient = useQueryClient();
  const { createGym, createGymWithOwner, updateGym, deleteGym } = useGymMutations();
  const { apiError, setApiError, handleApiError } = useApiErrorHandler<GymFormValues>();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGym, setSelectedGym] = useState<GymWithOwner | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [gymIdToDelete, setGymIdToDelete] = useState<string | null>(null);

  const handleCreate = () => {
    setApiError(null);
    setSelectedGym(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (gym: GymWithOwner) => {
    setApiError(null);
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
      onError: (error) => {
        setIsConfirmOpen(false);
        handleApiError(error);
      },
    });
  };

  const handleSubmit = async (data: GymFormValues) => {
    setApiError(null);
    try {
      if (selectedGym) {
        await updateGym.mutateAsync({ id: selectedGym.id, data });
        toast.success("Gimnasio actualizado correctamente");
      } else {
        await createGymWithOwner.mutateAsync(data);
        toast.success("Gimnasio creado correctamente");
      }
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: gymKeys.lists() });
      return true;
    } catch (error) {
      handleApiError(error);
      return false;
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
    isLoading: createGym.isPending || createGymWithOwner.isPending || updateGym.isPending || deleteGym.isPending,
    apiError,
  };
};
