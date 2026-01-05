import { useAppQuery } from '@/common/hooks/useAppQuery';
import { gymsApi } from '../../api/gyms.api';
import { gymKeys } from '../../queryKeys';
import type { Gym } from '../../types/gyms.types';
import type { BaseDataLoadHookReturn } from '@/common/types/sharedHookReturns.types';

export interface UseGymsReturn extends BaseDataLoadHookReturn {
  gyms: Gym[];
}

export const useGyms = (): UseGymsReturn => {
  const { data, isLoading, error } = useAppQuery(
    gymKeys.lists(),
    () => gymsApi.getAll()
  );

  return {
    gyms: data || [],
    isLoading,
    error: error ? [error.message] : null,
  };
};
