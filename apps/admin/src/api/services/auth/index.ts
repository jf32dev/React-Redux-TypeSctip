/* eslint-disable camelcase */
import AdminService from '../../service';
import { AuthToken } from './type';

class Auth extends AdminService {
  public async authenticateJWT(code: string) {
    const fd = new FormData();
    fd.append('code', code);
    const result = await this.doPost<AuthToken>(`/api/v1/auth/jwt`, fd);
    return result;
  }
}

const authService = new Auth();
export default authService;
