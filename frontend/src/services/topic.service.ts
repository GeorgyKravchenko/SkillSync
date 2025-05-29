import { ITopic } from '@/types/topic.types';
import api from '@/utils/api';

class topicService {
  private static API_URL = '/topics';
  static async getTopics() {
    return await api.get<ITopic[]>(`${this.API_URL}/`);
  }
  static async createTopic(data: { title: string; slug: string }) {
    return await api.post(`${this.API_URL}`, data);
  }
  static async deleteTopic(id: number) {
    return await api.delete(`${this.API_URL}/${id}`);
  }
}
export default topicService;
