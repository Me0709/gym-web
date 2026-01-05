import { AxiosError } from 'axios';
import type { ApiErrorResponse } from '../types/apiError.types';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

const getApiErrorMessage = (error: AxiosError<ApiErrorResponse> | null): string | null => {
    if (!error) return null;
    const apiResponseData = error.response?.data;
    if (apiResponseData?.message) {
        return apiResponseData.message;
    }
    return error.message || "Ocurrió un error desconocido.";
};

type AppMutationOptions<TData, TVariables> = UseMutationOptions<
    TData,
    AxiosError<ApiErrorResponse>,
    TVariables
>;

export const useAppMutation = <TData = unknown, TVariables = unknown>(
    options: AppMutationOptions<TData, TVariables>
) => {
    const mutation = useMutation<TData, AxiosError<ApiErrorResponse>, TVariables>(options);

    const errorMessage = getApiErrorMessage(mutation.error);

    return {
        ...mutation,
        error: mutation.error,
        errorMessage: mutation.isError ? errorMessage : null,
    };
};
