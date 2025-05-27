import { IUserLogin, IUserRegister } from '@/types/user.types';
import axios from 'axios';

class AuthService {
  private static API_URL = 'http://localhost:4200/api/auth';
  static async register(data: IUserRegister) {
    return await axios.post(`${this.API_URL}/register`, data);
  }
  static async login(data: IUserLogin) {
    return await axios.post(`${this.API_URL}/login`, data);
  }
}
export default AuthService;
