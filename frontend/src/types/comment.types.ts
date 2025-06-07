import { BaseResponseData } from './bases.types';
import { IReaction } from './reaction.enum';
import { IUser } from './user.types';

export interface IComment extends ICommentCreateDto, BaseResponseData {
  dislikesCount: number;
  likesCount: number;
  author: Pick<IUser, 'id' | 'name' | 'avatar'>;
  CommentReactions: IReaction[];
  isReply: boolean;
  replies: Omit<IComment, 'replies'>[];
}

export interface ICommentCreateDto {
  content: string;
  postId: number;
}
