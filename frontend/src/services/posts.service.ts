import { IPost, IPostCreateDto } from '@/types/post.types';
import api from '@/utils/api';

class PostsService {
  private static API_URL = '/posts';
  static async getPosts() {
    return await api.get<IPost[]>(`${this.API_URL}/`);
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
}

export default PostsService;
