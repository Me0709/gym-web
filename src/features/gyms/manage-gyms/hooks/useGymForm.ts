import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gymSchema, type GymFormValues } from "../../schemas/gyms.schemas";
import { type GymWithOwner, GYM_STATUS } from "../../types/gyms.types";

interface UseGymFormProps {
    initialData?: GymWithOwner | null;
}

export const useGymForm = ({ initialData }: UseGymFormProps) => {
    const form = useForm<GymFormValues>({
        resolver: zodResolver(gymSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            address: "",
            status: GYM_STATUS.ACTIVE,
            ownerFirstName: "",
            ownerLastName: "",
            ownerDocumentId: "",
            ownerEmail: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name,
                address: initialData.address,
                status: initialData.status,
                ownerFirstName: initialData.owner?.firstName ?? "",
                ownerLastName: initialData.owner?.lastName ?? "",
                ownerDocumentId: initialData.owner?.documentId ?? "",
                ownerEmail: initialData.owner?.email ?? "",
            });
        } else {
            form.reset({
                name: "",
                address: "",
                status: GYM_STATUS.ACTIVE,
                ownerFirstName: "",
                ownerLastName: "",
                ownerDocumentId: "",
                ownerEmail: "",
            });
        }
    }, [initialData, form]);

    return {
        form,
    };
};
