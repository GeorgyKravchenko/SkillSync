import { IUserLogin, IUserCreateDto } from '@/types/user.types';
import api from '@/utils/api';
import axios from 'axios';

class AuthService {
  private static API_PREFIX = '/auth';
  static async register(data: IUserCreateDto) {
    return await axios.post(`${this.API_PREFIX}/register`, data);
  }
  static async login(data: IUserLogin) {
    return await api.post(`${this.API_PREFIX}/login`, data);
  }
}
export default AuthService;
