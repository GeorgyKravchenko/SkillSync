import { IUpdateProfile, IUser } from '@/types/user.types';
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
  static async uploadAvatar(file1: File) {
    console.log('Uploading avatar:', file1);
    const file = new FormData();
    file.append('avatar', file1);
    console.log('FormData created:', file);
    return await api.post<IUser>(`${this.API_URL}/upload-avatar`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  static async deleteAvatar() {
    return await api.delete<IUser>(`${this.API_URL}/delete-avatar`);
  }
}
export default ProfileService;
