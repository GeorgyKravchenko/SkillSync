import api from '@/utils/api';

interface getProfileResponse {
  id: number;
  name: string;
  email: string;
}
class ProfileService {
  private static API_URL = '/profile';
  static async getProfile() {
    return await api.get<getProfileResponse>(`${this.API_URL}/`);
  }
  static async login() {
    return await api.post(`${this.API_URL}/`);
  }
}
export default ProfileService;
