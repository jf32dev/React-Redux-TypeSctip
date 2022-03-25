import { HttpServices } from '@redbull/services';
import envConfig from '../config';
import { refreshMiddleware, configMiddleware } from './interceptor';

abstract class AdminService extends HttpServices {
  constructor() {
    super(envConfig.apiBase);

    this.client.interceptors.request.use(configMiddleware);
    this.client.interceptors.response.use(
      (response) => response,
      (error) => refreshMiddleware(this.client, error)
    );
  }
}

export default AdminService;
