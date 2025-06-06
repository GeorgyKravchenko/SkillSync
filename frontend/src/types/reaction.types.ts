import { Reaction } from './reaction.enum';

export interface IReactionResponse {
  likesCount: number;
  dislikesCount: number;
}
export interface IReactionCommentResponse extends IReactionResponse {
  CommentReactions: Reaction[];
}
