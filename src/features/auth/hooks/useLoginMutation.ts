import { useAppMutation } from "@/common/hooks/useAppMutation"
import type { AuthResponse, LoginFormValues } from "../types/auth.types"
import { authApi } from "../api/auth"

export const useLoginMutation = () => {
    return useAppMutation<AuthResponse, LoginFormValues>({
        mutationFn: authApi.login,
    })
}
