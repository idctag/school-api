import { Role } from '@prisma/client';

export type GetUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  roles: Role[];
  phone: string;
  created_at: Date;
  updated_at: Date;
  status: boolean;
  birthday: Date;
  age: number;
  residentId: string;
};
