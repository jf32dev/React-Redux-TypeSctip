import { ResponseSuccess } from '../../sharedType';
import BaseService from '../../service';
import { IApplication } from './type';

class ApplicationService extends BaseService {
  public async createApplication(applicationData: IApplication) {
    const application = await this.doPost<ResponseSuccess<boolean>>(
      `/api/v1/application`,
      applicationData
    );
    return application;
  }
}

const productService = new ApplicationService();

export default productService;
