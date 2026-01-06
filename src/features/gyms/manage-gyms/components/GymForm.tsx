import { type GymFormValues, gymInfoSchema, ownerInfoSchema } from "../../schemas/gyms.schemas";
import { type GymWithOwner } from "../../types/gyms.types";
import { useGymForm } from "../hooks/useGymForm";
import { MultiStepFormContainer } from "@/components/MultiStepFormContainer";
import { type FormStep } from "@/hooks/useMultiStepForm";
import { GymInfoStep } from "./form-steps/GymInfoStep";
import { OwnerInfoStep } from "./form-steps/OwnerInfoStep";

interface GymFormProps {
  onSubmit: (data: GymFormValues) => Promise<boolean>;
  initialData?: GymWithOwner | null;
  isLoading?: boolean;
  onCancel?: () => void;
  apiError?: string | null;
}

export function GymForm({ onSubmit, initialData, isLoading, apiError }: GymFormProps) {
  const { form } = useGymForm({ initialData });

  const steps: FormStep<GymFormValues, { isEdit: boolean }>[] = [
    {
      id: 1,
      name: "Gimnasio",
      component: GymInfoStep,
      schema: gymInfoSchema,
      fieldsToValidate: ["name", "address", "status"],
    },
    {
      id: 2,
      name: "Dueño",
      component: OwnerInfoStep,
      schema: ownerInfoSchema,
      fieldsToValidate: ["ownerDocumentId", "ownerFirstName", "ownerLastName", "ownerEmail"],
    },
  ];

  const handleFinalSubmit = async () => {
    let success = false;
    await form.handleSubmit(async (data) => {
      success = await onSubmit(data);
    })();
    return success;
  };

  return (
    <div className="pt-4">
      <MultiStepFormContainer
        form={form}
        steps={steps}
        onSubmit={handleFinalSubmit}
        apiError={apiError ?? null}
        isPending={!!isLoading}
        stepProps={{ isEdit: !!initialData }}
        submitButtonText={initialData ? "Actualizar" : "Crear Gimnasio"}
        submittingButtonText="Guardando..."
      />
    </div>
  );
}

