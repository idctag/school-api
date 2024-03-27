import { Role } from '@prisma/client';

export class GetUser {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  roles?: Role[];
  phone: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  status: boolean;
  birthday: Date | null;
  age: number | null;
  residentId: string | null;
}
