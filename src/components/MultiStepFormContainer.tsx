import * as React from "react";
import {
  type UseFormReturn,
  type FieldValues,
} from "react-hook-form";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import { Button } from "./ui/button";
import { useMultiStepForm, type FormStep } from "@/hooks/useMultiStepForm";

interface MultiStepFormContainerProps<
  TFormValues extends FieldValues,
  TStepProps extends object
> {
  form: UseFormReturn<TFormValues>;
  steps: FormStep<TFormValues, TStepProps>[];
  onSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
  apiError: string | null;
  isPending: boolean;
  stepProps: TStepProps;
  submitButtonText?: string;
  submittingButtonText?: string;
}

export function MultiStepFormContainer<
  TFormValues extends FieldValues,
  TStepProps extends object
>({
  form,
  steps,
  onSubmit,
  apiError,
  isPending,
  stepProps,
  submitButtonText = "Crear",
  submittingButtonText = "Creando...",
}: MultiStepFormContainerProps<TFormValues, TStepProps>) {
  const {
    currentStepIndex,
    handleNextStep,
    handlePreviousStep,
    handleGoToStep,
    handleResetFormSteps,
    formSteps,
    CurrentStepComponent,
    isFirstStep,
    isLastStep,
  } = useMultiStepForm<TFormValues, TStepProps>(form, steps);

  const finalHandleSubmit = async (e: React.BaseSyntheticEvent) => {
    const isValid = await handleNextStep();
    if (isValid) {
      await onSubmit(e);
      handleResetFormSteps();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={finalHandleSubmit} className="space-y-6">
        {apiError && (
          <div className="p-4 bg-red-100 text-red-700 rounded-md text-sm text-center">
            {apiError}
          </div>
        )}
        <div className="flex justify-center space-x-2 mb-6">
          {formSteps.map((step, index) => (
            <span
              key={step.id}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                currentStepIndex === index
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
              )}
              onClick={() => handleGoToStep(index)}
            >
              {index + 1}. {step.name}
            </span>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner">
          <CurrentStepComponent {...stepProps} />
        </div>

        <div className="flex justify-between mt-6">
          {!isFirstStep && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePreviousStep}
              disabled={isPending}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Anterior
            </Button>
          )}

          {!isLastStep && (
            <Button
              type="button"
              onClick={handleNextStep}
              className="ml-auto gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              Siguiente
            </Button>
          )}

          {isLastStep && (
            <Button
              type="submit"
              disabled={isPending}
              className="ml-auto gap-2"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? submittingButtonText : submitButtonText}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
