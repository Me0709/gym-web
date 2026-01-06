import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GymTable } from "../components/GymTable";
import { GymDialog } from "../components/GymDialog";
import { useGymsWithOwner } from "../hooks/useGymsWithOwner";
import { useGymActions } from "../hooks/useGymActions";
import { ConfirmDialog } from "@/components/ConfirmDialog";

export default function GymsPage() {
  const { gyms, isLoading: isGymsLoading } = useGymsWithOwner();
  const {
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
    isLoading: isActionLoading,
    apiError,
  } = useGymActions();

  return (
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
        isLoading={isGymsLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <GymDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmit}
        initialData={selectedGym}
        isLoading={isActionLoading}
        apiError={apiError}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={confirmDelete}
        title="Desactivar Gimnasio"
        description="Este gimnasio se moverá a la lista de inactivos. Podrás reactivarlo en cualquier momento en esa misma lista."
        confirmText="Desactivar"
        variant="destructive"
      />
    </div>
  );
}
