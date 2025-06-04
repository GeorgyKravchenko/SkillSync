import { BaseResponseData } from './bases.types';

export interface IUser extends Omit<IUserCreateDto, 'password'>, BaseResponseData {
  avatar?: string;
  description?: string;
}

export type IUserLogin = Omit<IUserCreateDto, 'name'>;

export interface IUserCreateDto {
  name: string;
  email: string;
  password: string;
}
export interface IUpdateProfile {
  name?: string;
  description?: string;
}
