import { useAppQuery } from '@/common/hooks/useAppQuery';
import { gymsApi } from '../../api/gyms.api';
import { gymKeys } from '../../queryKeys';
import type { GymWithOwner } from '../../types/gyms.types';
import type { BaseDataLoadHookReturn } from '@/common/types/sharedHookReturns.types';

export interface UseGymsWithOwnerReturn extends BaseDataLoadHookReturn {
  gyms: GymWithOwner[];
}

export const useGymsWithOwner = (): UseGymsWithOwnerReturn => {
  const { data, isLoading, error } = useAppQuery(
    gymKeys.lists(),
    () => gymsApi.getAllWithOwner()
  );

  return {
    gyms: data || [],
    isLoading,
    error: error ? [error.message] : null,
  };
};
