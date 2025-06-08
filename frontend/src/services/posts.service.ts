import { IPost, IPostCreateDto } from '@/types/post.types';
import api from '@/utils/api';

class PostsService {
  private static API_URL = '/posts';
  static async getPosts(skip: number = 0, limit: number = 10) {
    return await api.get<IPost[]>(`${this.API_URL}?skip=${skip}&limit=${limit}`);
  }
  static async createPost(data: IPostCreateDto) {
    return await api.post(`${this.API_URL}/`, data);
  }
  static async updatePost(id: number, data: { title?: string; content?: string }) {
    return await api.put(`${this.API_URL}/${id}`, data);
  }
  static async deletePost(id: number) {
    return await api.delete(`${this.API_URL}/${id}`);
  }
  static async getPostById(id: number) {
    return await api.get<IPost>(`${this.API_URL}/${id}`);
  }
  static async getPostsByTopic(topicId: number) {
    return await api.get<IPost[]>(`${this.API_URL}/topic/${topicId}`);
  }
  static async addLikeForPost(postId: number) {
    return await api.post(`${this.API_URL}/${postId}/like`);
  }
  static async addDislikeForPost(postId: number) {
    return await api.post(`${this.API_URL}/${postId}/dislike`);
  }
  static async searchPosts(query: string, skip: number = 0, limit: number = 10) {
    return await api.post<IPost[]>(`${this.API_URL}/search?q=${query}&skip=${skip}&limit=${limit}`);
  }
}

export default PostsService;
