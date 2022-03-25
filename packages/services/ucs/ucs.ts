import HttpServices from '../api/base';
import {
  UCLinkParams,
  UCLinkResponse,
  UCSearchParams,
  UCSearchResponse,
} from './type';

class UniversalContentServices extends HttpServices {
  configure() {
    return this.client;
  }

  generateLink(params: UCLinkParams) {
    const { btcUrn, ...rest } = params;
    return this.doPost<UCLinkResponse>(`/v1/content/${btcUrn}/link`, rest);
  }

  search(params: UCSearchParams) {
    return this.doPost<UCSearchResponse>('/v1/content/search', params);
  }
}

export default UniversalContentServices;
