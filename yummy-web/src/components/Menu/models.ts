import type { IUserRoles } from '@pages/ProfilePage/models';

export interface IMenuPayload {
  name: string;
}

export enum MenuActions {
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

export interface AllowedUser {
  id: string;
  username: string;
  role: IUserRoles;
}

export interface IMenu {
  id: string;
  name: string;
  description: string;
  allowedUsers: AllowedUser[];
  actions: MenuActions[];
}
