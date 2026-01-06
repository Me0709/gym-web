import * as React from "react";
import {
  type UseFormReturn,
  type FieldValues,
} from "react-hook-form";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Loader2, ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
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
  onSubmit: (event?: React.BaseSyntheticEvent) => Promise<boolean>;
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
    e.preventDefault();
    if (isLastStep) {
      const isValid = await handleNextStep();
      if (isValid) {
        const success = await onSubmit(e);
        if (success) {
          handleResetFormSteps();
        }
      }
    } else {
      await handleNextStep();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={finalHandleSubmit} className="space-y-6">
        {apiError && (
          <div className="flex items-start gap-2 p-3 text-sm font-medium border rounded-lg border-destructive/50 bg-destructive/10 text-destructive">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <p className="whitespace-pre-line">{apiError}</p>
          </div>
        )}

        <div className="flex items-center justify-center gap-2">
          {formSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => handleGoToStep(index)}
              >
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold transition-all",
                    currentStepIndex === index
                      ? "bg-primary text-primary-foreground border-primary shadow-sm scale-110"
                      : "bg-background text-muted-foreground border-input group-hover:border-primary/50"
                  )}
                >
                  {index + 1}
                </div>
                <span className={cn(
                  "hidden text-sm font-medium md:inline-block transition-colors",
                  currentStepIndex === index ? "text-foreground" : "text-muted-foreground group-hover:text-foreground/80"
                )}>
                  {step.name}
                </span>
              </div>
              {index < formSteps.length - 1 && (
                <div className="h-0.5 w-8 bg-muted md:w-12 mx-1" />
              )}
            </React.Fragment>
          ))}
        </div>

        <Card className="border-none shadow-none bg-slate-50/50 dark:bg-slate-900/50">
          <CardContent className="pt-2">
            <CurrentStepComponent {...stepProps} />
          </CardContent>
        </Card>

        <div className="flex items-center justify-between gap-4 pt-2">
          {!isFirstStep ? (
            <Button
              type="button"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                handlePreviousStep();
              }}
              disabled={isPending}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Anterior
            </Button>
          ) : (
            <div />
          )}

          <div className="flex gap-3">
            {!isLastStep ? (
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleNextStep();
                }}
                className="gap-2"
              >
                Siguiente
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isPending}
                className="gap-2 min-w-30"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {submittingButtonText}
                  </>
                ) : (
                  submitButtonText
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
