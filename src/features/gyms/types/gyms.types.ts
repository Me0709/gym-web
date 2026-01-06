export const GYM_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  DELETED: 'deleted',
} as const;

export type GymStatus = typeof GYM_STATUS[keyof typeof GYM_STATUS];

export interface Owner {
  documentId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Gym {
  id: string;
  name: string;
  address: string;
  status: GymStatus;
  createdAt: string;
  updatedAt: string;
}

export interface GymWithOwner extends Gym {
  owner: Owner;
}

export type CreateGymValues = Omit<Gym, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'owner'>;

export type CreateGymWithOwnerValues = CreateGymValues & {
  ownerDocumentId: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerEmail: string;
};

export type UpdateGymValues = Partial<CreateGymWithOwnerValues> & { status?: GymStatus };
