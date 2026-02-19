import type { IUserRoles } from '@pages/ProfilePage/models';

export enum CollectionActions {
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

export interface AllowedUser {
  id: string;
  username: string;
  role: IUserRoles;
}

export interface ICollection {
  id: string;
  name: string;
  description: string;
  allowedUsers: AllowedUser[];
  actions: CollectionActions[];
}

export interface ICollectionPayload extends Omit<ICollection, 'id' | 'actions' | 'allowedUsers'> {
  name: string;
}

export interface IDishCollection {
  id: string;
  name: string;
  checked: boolean;
}
