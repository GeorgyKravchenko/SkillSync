export enum Reaction {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}

export interface IReaction {
  authorId: number;
  reaction: Reaction;
}
