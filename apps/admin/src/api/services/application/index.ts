import { ResponseSuccess } from '../../sharedType';
import AdminService from '../../service';
import {
  IApplication,
  IUserGroup,
  IUpdateApplicationStatus,
  EApplicationFilter,
} from './type';

class ApplicationService extends AdminService {
  public async getApplicationList(
    offset: number = 0,
    limit: number,
    status?: EApplicationFilter
  ) {
    const appList = await this.doGet<ResponseSuccess<IApplication[]>>(
      `/api/v1/application/list?offset=${offset}&limit=${limit}${
        status ? `&result=${status}` : ''
      }`
    );
    return appList;
  }

  public async getApplicationById(applicationId: string) {
    const application = await this.doGet<IApplication>(
      `/api/v1/application/${applicationId}`
    );
    return application;
  }

  public async getGroups() {
    const groups = await this.doGet<ResponseSuccess<IUserGroup[]>>(
      `/api/v1/application/groups`
    );
    return groups;
  }

  public async updateApplicationStatus(
    applicationId: string,
    appObject: IUpdateApplicationStatus
  ) {
    const updateResponse = await this.doPut<ResponseSuccess<string>>(
      `/api/v1/application/${applicationId}`,
      appObject
    );
    return updateResponse;
  }
}

const applicationService = new ApplicationService();

export default applicationService;
