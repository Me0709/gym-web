import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { type Gym, GYM_STATUS, type GymStatus } from "../../types/gyms.types";

const statusLabels: Record<GymStatus, string> = {
  [GYM_STATUS.ACTIVE]: "Activo",
  [GYM_STATUS.EXPIRED]: "Expirado",
  [GYM_STATUS.DELETED]: "Eliminado",
};

const statusStyles: Record<GymStatus, string> = {
  [GYM_STATUS.ACTIVE]: "bg-green-100 text-green-800",
  [GYM_STATUS.EXPIRED]: "bg-yellow-100 text-yellow-800",
  [GYM_STATUS.DELETED]: "bg-red-100 text-red-800",
};

interface GymTableProps {
  gyms: Gym[];
  onEdit: (gym: Gym) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export function GymTable({ gyms, onEdit, onDelete, isLoading }: GymTableProps) {
  if (isLoading) {
    return <div className="text-center py-10">Cargando gimnasios...</div>;
  }

  if (gyms.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No hay gimnasios registrados.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gyms.map((gym) => (
            <TableRow key={gym.id}>
              <TableCell className="font-medium">{gym.name}</TableCell>
              <TableCell>
                <div className="max-w-75 truncate" title={gym.address}>
                  {gym.address}
                </div>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[gym.status]}`}>
                  {statusLabels[gym.status]}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(gym)}
                    title="Editar"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(gym.id)}
                    className="text-destructive hover:text-destructive"
                    title="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
