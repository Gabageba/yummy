export enum AllowedUsersRoles {
  CREATOR = 'CREATOR',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
}

export interface AllowedUser {
  id: string;
  role: AllowedUsersRoles;
  username: string;
}

export enum CollectionActions {
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}
