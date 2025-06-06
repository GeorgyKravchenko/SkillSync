import { ICommentCreateDto } from '@/types/comment.types';
import { IReactionCommentResponse } from '@/types/reaction.types';
import api from '@/utils/api';

class CommentService {
  private static API_PREFIX = '/comments';
  static async createComment(data: ICommentCreateDto) {
    return await api.post(`${this.API_PREFIX}`, data);
  }
  static async updateComment(content: string, id: number) {
    return await api.put(`${this.API_PREFIX}/${id}`, { content });
  }
  static async deleteComment(id: number) {
    return await api.delete(`${this.API_PREFIX}/${id}`);
  }
  static async addLikeForComment(commentId: number) {
    return await api.post<IReactionCommentResponse>(`${this.API_PREFIX}/${commentId}/like`);
  }
  static async addDislikeForComment(commentId: number) {
    return await api.post<IReactionCommentResponse>(`${this.API_PREFIX}/${commentId}/dislike`);
  }
}
export default CommentService;
