import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { GymTable } from "../components/GymTable";
import { GymDialog } from "../components/GymDialog";
import { useGyms } from "../hooks/useGyms";
import { useGymMutations } from "../hooks/useGymMutations";
import type { Gym } from "../../types/gyms.types";
import { type GymFormValues } from "../../schemas/gyms.schemas";
import { useQueryClient } from "@tanstack/react-query";
import { gymKeys } from "../../queryKeys";
import { toast } from "sonner";

export default function GymsPage() {
  const queryClient = useQueryClient();
  const { gyms, isLoading } = useGyms();
  const { createGym, updateGym, deleteGym } = useGymMutations();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);

  const handleCreate = () => {
    setSelectedGym(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (gym: Gym) => {
    setSelectedGym(gym);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este gimnasio?")) {
      deleteGym.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: gymKeys.lists() });
          toast.success("Gimnasio eliminado correctamente");
        },
      });
    }
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

  return (
    <MainLayout title="Gestión de Gimnasios">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Gimnasios</h2>
            <p className="text-muted-foreground">
              Administra los gimnasios registrados en la plataforma.
            </p>
          </div>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" /> Nuevo Gimnasio
          </Button>
        </div>

        <GymTable
          gyms={gyms}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <GymDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleSubmit}
          initialData={selectedGym}
          isLoading={createGym.isPending || updateGym.isPending}
        />
      </div>
    </MainLayout>
  );
}
