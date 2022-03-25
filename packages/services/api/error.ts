import { AxiosError } from 'axios';

class ServiceError {
  public message: string;

  public responseMessage?: string;

  public httpStatus?: number;

  public httpStatusText?: string;

  constructor(e: AxiosError) {
    this.message = e.message;
    this.responseMessage = e.response?.data;
    this.httpStatus = e.response?.status;
    this.httpStatusText = e.response?.statusText;
  }
}

export default ServiceError;
