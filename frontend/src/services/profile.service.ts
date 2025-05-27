import { IUpdateProfile } from '@/types/user.types';
import api from '@/utils/api';

interface getProfileResponse {
  id: number;
  name: string;
  email: string;
  description: string;
}
class ProfileService {
  private static API_URL = '/profile';
  static async getProfile() {
    return await api.get<getProfileResponse>(`${this.API_URL}/`);
  }
  static async updateProfile(data: IUpdateProfile) {
    return await api.post(`${this.API_URL}/`, data);
  }
}
export default ProfileService;
