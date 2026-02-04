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

export enum MenuActions {
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}
