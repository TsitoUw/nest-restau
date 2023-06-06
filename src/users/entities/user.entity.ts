import { Roles } from '@prisma/client';

export class User {
  id?: string;
  name: string;
  password?: string;
  role?: Roles;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
