import { HttpServices } from '@redbull/services';
import envConfig from '../config';

abstract class BaseService extends HttpServices {
  constructor() {
    super(envConfig.apiBase);
  }
}

export default BaseService;
