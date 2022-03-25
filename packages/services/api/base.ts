import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { uniqueId } from 'lodash';
import Result from '../shared/results';
import ServiceError from './error';

class HttpServices {
  protected client: AxiosInstance;

  constructor(base: string) {
    this.client = axios.create({
      baseURL: base,
    });
  }

  protected async doGet<T = any>(url: string, config?: AxiosRequestConfig) {
    let result = null;
    const requestId = uniqueId('axios_');
    try {
      const axiosResult = await this.client.get<T>(url, config);
      result = new Result<AxiosResponse<T>, null>(axiosResult, requestId, null);
    } catch (e) {
      result = new Result<null, ServiceError>(
        null,
        requestId,
        new ServiceError(e)
      );
    }
    return result;
  }

  protected async doPost<T = any, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
  ) {
    let result = null;
    const requestId = uniqueId('axios_');
    try {
      const axiosResult = await this.client.post(url, data, config);
      result = new Result<AxiosResponse<T>, null>(axiosResult, requestId, null);
    } catch (e) {
      result = new Result<null, ServiceError>(
        null,
        requestId,
        new ServiceError(e)
      );
    }
    return result;
  }

  protected async doPut<T = any, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
  ) {
    let result = null;
    const requestId = uniqueId('axios_');
    try {
      const axiosResult = await this.client.put(url, data, config);
      result = new Result<AxiosResponse<T>, null>(axiosResult, requestId, null);
    } catch (e) {
      result = new Result<null, ServiceError>(
        null,
        requestId,
        new ServiceError(e)
      );
    }
    return result;
  }

  protected async doPatch<T = any, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
  ) {
    let result = null;
    const requestId = uniqueId('axios_');
    try {
      const axiosResult = await this.client.patch(url, data, config);
      result = new Result<AxiosResponse<T>, null>(axiosResult, requestId, null);
    } catch (e) {
      result = new Result<null, ServiceError>(
        null,
        requestId,
        new ServiceError(e)
      );
    }
    return result;
  }

  protected async doDelete<T = any>(url: string, config?: AxiosRequestConfig) {
    let result = null;
    const requestId = uniqueId('axios_');
    try {
      const axiosResult = await this.client.delete(url, config);
      result = new Result<AxiosResponse<T>, null>(axiosResult, requestId, null);
    } catch (e) {
      result = new Result<null, ServiceError>(
        null,
        requestId,
        new ServiceError(e)
      );
    }
    return result;
  }
}

export default HttpServices;
