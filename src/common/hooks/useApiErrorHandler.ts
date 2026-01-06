import { useState } from "react";
import type { UseFormReturn, Path, FieldValues } from "react-hook-form";
import type { ApiErrorResponse } from "@/common/types/apiError.types";
import type { AxiosError } from "axios"; 

interface UseApiErrorHandlerReturn<TFormValues extends FieldValues> {
    apiError: string | null;
    setApiError: (error: string | null) => void;
    handleApiError: (error: unknown | AxiosError, form?: UseFormReturn<TFormValues>) => void;
}

export const useApiErrorHandler = <TFormValues extends FieldValues>(): UseApiErrorHandlerReturn<TFormValues> => {
    const [apiError, setApiError] = useState<string | null>(null);

    const handleApiError = (error: unknown | AxiosError, form?: UseFormReturn<TFormValues>) => {
        console.error("Error de API:", error);

        const serverError: ApiErrorResponse = (error as AxiosError).response?.data as ApiErrorResponse;

        if (serverError) {
            if (serverError.field && form) {
                const fieldNameForForm = serverError.field;

                form.setError(fieldNameForForm as Path<TFormValues>, {
                    type: 'manual',
                    message: serverError.details && serverError.details.length > 0
                        ? serverError.details.join('. ')
                        : serverError.message,
                });
            } else {
                let generalErrorMessage = serverError.message;
                if (serverError.details && serverError.details.length > 0) {
                    generalErrorMessage = serverError.details.join('\n');
                }
                setApiError(generalErrorMessage);
            }
        } else {
            setApiError('Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo.');
        }
    };

    return {
        apiError,
        setApiError,
        handleApiError,
    };
};
