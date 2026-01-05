import { useAppMutation } from '@/common/hooks/useAppMutation';
import { gymsApi } from '../../api/gyms.api';
import type { CreateGymValues, UpdateGymValues, Gym } from '../../types/gyms.types';

export const useGymMutations = () => {
  const createGym = useAppMutation<Gym, CreateGymValues>({
    mutationFn: gymsApi.create,
  });

  const updateGym = useAppMutation<Gym, { id: string; data: UpdateGymValues }>({
    mutationFn: ({ id, data }) => gymsApi.update(id, data),
  });

  const deleteGym = useAppMutation<void, string>({
    mutationFn: gymsApi.delete,
  });

  return { createGym, updateGym, deleteGym };
};
