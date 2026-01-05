import { api } from '@/api';
import type { Gym, CreateGymValues, UpdateGymValues } from '../types/gyms.types';

export const gymsApi = {
  getAll: async (): Promise<Gym[]> => {
    const response = await api.get<Gym[]>('/gyms');
    return response.data;
  },

  getById: async (id: string): Promise<Gym> => {
    const response = await api.get<Gym>(`/gyms/${id}`);
    return response.data;
  },

  create: async (data: CreateGymValues): Promise<Gym> => {
    const response = await api.post<Gym>('/gyms', data);
    return response.data;
  },

  update: async (id: string, data: UpdateGymValues): Promise<Gym> => {
    const response = await api.patch<Gym>(`/gyms/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/gyms/${id}`);
  },
};
