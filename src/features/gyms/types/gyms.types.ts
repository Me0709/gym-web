export const GYM_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  DELETED: 'deleted',
} as const;

export type GymStatus = typeof GYM_STATUS[keyof typeof GYM_STATUS];

export interface Gym {
  id: string;
  name: string;
  address: string;
  status: GymStatus;
  createdAt: string;
  updatedAt: string;
}

export type CreateGymValues = Omit<Gym, 'id' | 'createdAt' | 'updatedAt' | 'status'>;
export type UpdateGymValues = Partial<CreateGymValues> & { status?: GymStatus };
