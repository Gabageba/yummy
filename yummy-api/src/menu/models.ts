export enum AllowedUsersRoles {
  CREATOR = 'CREATOR',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
}

export interface AllowedUser {
  id: string;
  role: AllowedUsersRoles;
}
