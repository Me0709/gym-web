import { useState, useMemo, useEffect } from "react";
import type { UseFormReturn, FieldValues, Path } from "react-hook-form";
import type { ZodObject, ZodRawShape } from "zod";

export interface FormStep<TFormValues extends FieldValues, TStepProps extends object> {
    id: number;
    name: string;
    component: React.ComponentType<TStepProps>;
    schema: ZodObject<ZodRawShape>;
    fieldsToValidate?: Path<TFormValues>[];
}

interface UseMultiStepFormReturn<TFormValues extends FieldValues, TStepProps extends object> {
    currentStepIndex: number;
    handleNextStep: () => Promise<boolean>;
    handlePreviousStep: () => void;
    handleGoToStep: (index: number) => Promise<boolean>;
    handleResetFormSteps: () => void;
    formSteps: FormStep<TFormValues, TStepProps>[];
    CurrentStepComponent: React.ComponentType<TStepProps>;
    isFirstStep: boolean;
    isLastStep: boolean;
}

export const useMultiStepForm = <TFormValues extends FieldValues, TStepProps extends object>(
    form: UseFormReturn<TFormValues, undefined, TFormValues>,
    steps: FormStep<TFormValues, TStepProps>[]
): UseMultiStepFormReturn<TFormValues, TStepProps> => {
    const [currentStepIndex, setCurrentStep] = useState(0);

    const CurrentStepComponent = useMemo(() => steps[currentStepIndex].component, [currentStepIndex, steps]);
    const currentStepSchema = useMemo(() => steps[currentStepIndex].schema, [currentStepIndex, steps]);
    const currentStepFieldsToValidate = useMemo(() => {
        return steps[currentStepIndex].fieldsToValidate || Object.keys(currentStepSchema.shape) as Path<TFormValues>[];
    }, [currentStepIndex, steps, currentStepSchema]);

    useEffect(() => {
        form.clearErrors();
    }, [currentStepIndex, form]);

    const validateCurrentStep = async (): Promise<boolean> => {
        const isValid = await form.trigger(currentStepFieldsToValidate, { shouldFocus: true });
        return isValid;
    };

    const handleNextStep = async (): Promise<boolean> => {
        const isValid = await validateCurrentStep();
        if (isValid) {
            if (currentStepIndex < steps.length - 1) {
                setCurrentStep(prev => prev + 1);
                return true;
            }
            return true;
        } else {
            return false;
        }
    };

    const handlePreviousStep = () => {
        if (currentStepIndex > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleGoToStep = async (index: number): Promise<boolean> => {
        if (index === currentStepIndex) return true;

        if (index < currentStepIndex) {
            setCurrentStep(index);
            return true;
        } else {
            const isCurrentStepValid = await validateCurrentStep();
            if (isCurrentStepValid) {
                setCurrentStep(index);
                return true;
            }
            return false;
        }
    };

    const handleResetFormSteps = () => {
        setCurrentStep(0);
    };

    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;

    return {
        currentStepIndex,
        handleNextStep,
        handlePreviousStep,
        handleGoToStep,
        handleResetFormSteps,
        formSteps: steps,
        CurrentStepComponent,
        isFirstStep,
        isLastStep,
    };
};
