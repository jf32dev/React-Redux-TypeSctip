import AdminService from '../../service';
import { MyProfile } from './type';

class Account extends AdminService {
  public async getMyProfile() {
    const profile = await this.doGet<MyProfile>('/api/v1/user/me');
    return profile;
  }
}

const accountService = new Account();

export default accountService;
