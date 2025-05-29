import { BaseResponseData } from './bases.types';
import { IUser } from './user.types';

export interface IPost extends IPostCreateDto, BaseResponseData {
  author: Pick<IUser, 'id' | 'name'>;
}

export interface IPostCreateDto {
  topicId: number;
  title: string;
  content?: string;
}
