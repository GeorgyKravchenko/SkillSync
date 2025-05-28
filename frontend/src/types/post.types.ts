import { IUser } from './user.types';

export interface IPost {
  id: number;
  title: string;
  content: string | null;
  createdAt: string;
  author: Pick<IUser, 'id' | 'name'>;
}
