import type { Gender, RoleType } from '@/constants/index.constants';

export type TRegisterPayload = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type TUserModel = {
  id: number;
  username: string;
  role: RoleType;
  firstName: string;
  lastName?: string;
  gender: Gender;
  avatarUrl?: string;
};

export type TRegisterResponse = {
  user: TUserModel;
  token: string;
};
