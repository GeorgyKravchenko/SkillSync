import { BaseResponseData } from './bases.types';
import { IComment } from './comment.types';
import { IReaction } from './reaction.enum';
import { IUser } from './user.types';

export interface IPost extends IPostCreateDto, BaseResponseData {
  dislikesCount: number;
  likesCount: number;
  author: Pick<IUser, 'id' | 'name'>;
  comments: IComment[];
  PostReactions: IReaction[];
}

export interface IPostCreateDto {
  topicId: number;
  title: string;
  content?: string;
}
