import { useForm, type SubmitHandler, type UseFormReturn } from 'react-hook-form'
import { type LoginFormValues, type AuthResponse } from '../types/auth.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { authSchema } from '../schemas/auth.schemas'
import { useApiErrorHandler } from '@/common/hooks/useApiErrorHandler'
import { useLoginMutation } from './useLoginMutation'
import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '@/common/types/apiError.types'
import { useAuth } from './useAuth'

import { useNavigate } from 'react-router-dom'
import { DEFAULT_DASHBOARD_PATHS, ROLE_PRIORITY } from '@/config/navConfiguration'

interface useLoginFormReturn {
    form: UseFormReturn<LoginFormValues>;
    isPending: boolean;
    formError: string | null;
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export const useLoginForm = (): useLoginFormReturn => {
    const navigate = useNavigate();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const { handleApiError, apiError, setApiError } = useApiErrorHandler<LoginFormValues>();

    const { login } = useAuth();
    const { mutate, isPending, errorMessage } = useLoginMutation();

    const onSuccess = (data: AuthResponse) => {
        login(data);
        form.reset();
        setApiError(null);
        
        const primaryRole = ROLE_PRIORITY.find(role => data.user.roles.includes(role));
        const redirectPath = primaryRole ? DEFAULT_DASHBOARD_PATHS[primaryRole] : "/dashboard";
        
        navigate(redirectPath);
    }

    const onError = (error: AxiosError<ApiErrorResponse>) => {
        handleApiError(error, form);
    }

    const onSubmit: SubmitHandler<LoginFormValues> = (data: LoginFormValues) => {
        form.clearErrors();
        setApiError(null);

        mutate(data, {
            onSuccess,
            onError
        })
    }

    return {
        form,
        isPending,
        formError: apiError || errorMessage,
        onSubmit: form.handleSubmit(onSubmit)
    }
}
