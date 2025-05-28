import { IPost } from '@/types/post.types';
import api from '@/utils/api';

class PostsService {
  private static API_URL = '/posts';
  static async getProfile() {
    return await api.get<IPost[]>(`${this.API_URL}/`);
  }
}

export default PostsService;
