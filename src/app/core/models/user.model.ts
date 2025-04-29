export type Role = 'USER' | 'ADMINISTRATOR';

export interface User {
  username: string;
  firstName: string;
  familyName: string;
  role: Role;
}