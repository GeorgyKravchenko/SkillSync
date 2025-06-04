import { BaseResponseData } from './bases.types';
import { IUser } from './user.types';

export interface IComment extends ICommentCreateDto, BaseResponseData {
  author: Pick<IUser, 'id' | 'name'>;
}

export interface ICommentCreateDto {
  content: string;
  postId: number;
}
