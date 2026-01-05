import { useQuery, type UseQueryOptions, type QueryKey } from "@tanstack/react-query";

const defaultQueryOptions = {
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: true, 
};

export const useAppQuery = <TData>(
    queryKey: QueryKey,
    queryFn: () => Promise<TData>,
    options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<TData>({
        queryKey,
        queryFn,
        ...defaultQueryOptions,
        ...options,
    });
};
