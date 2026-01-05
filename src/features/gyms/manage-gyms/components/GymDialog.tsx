import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { GymForm } from "./GymForm";
import { type GymFormValues } from "../../schemas/gyms.schemas";
import type { Gym } from "../../types/gyms.types";

interface GymDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: GymFormValues) => void;
  initialData?: Gym | null;
  isLoading?: boolean;
}

export function GymDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading,
}: GymDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Gimnasio" : "Crear Nuevo Gimnasio"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Modifica los datos del gimnasio a continuación."
              : "Ingresa la información para registrar un nuevo gimnasio en el sistema."}
          </DialogDescription>
        </DialogHeader>
        <GymForm
          onSubmit={onSubmit}
          initialData={initialData}
          isLoading={isLoading}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
