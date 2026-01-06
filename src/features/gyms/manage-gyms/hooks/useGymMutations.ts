import { useAppMutation } from '@/common/hooks/useAppMutation';
import { gymsApi } from '../../api/gyms.api';
import type { CreateGymValues, CreateGymWithOwnerValues, UpdateGymValues, Gym } from '../../types/gyms.types';

export const useGymMutations = () => {
  const createGym = useAppMutation<Gym, CreateGymValues>({
    mutationFn: gymsApi.create,
  });

  const createGymWithOwner = useAppMutation<Gym, CreateGymWithOwnerValues>({
    mutationFn: gymsApi.createWithOwner,
  });

  const updateGym = useAppMutation<Gym, { id: string; data: UpdateGymValues }>({
    mutationFn: ({ id, data }) => gymsApi.update(id, data),
  });

  const deleteGym = useAppMutation<void, string>({
    mutationFn: gymsApi.delete,
  });

  return { createGym, createGymWithOwner, updateGym, deleteGym };
};
