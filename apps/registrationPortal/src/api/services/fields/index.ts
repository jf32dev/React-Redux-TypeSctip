import BaseService from 'src/api/service';
import { ResponseSuccess } from '../../sharedType';
import { ICountry, ILanguage, IRegion } from './type';

class FieldsService extends BaseService {
  public async getCountry() {
    const country = await this.doGet<ResponseSuccess<ICountry[]>>(
      `/api/v1/country/list`
    );
    return country;
  }

  public async getRegion() {
    const region = await this.doGet<ResponseSuccess<IRegion[]>>(
      `/api/v1/region/list`
    );
    return region;
  }

  public async getRegionByCountryId(countryId: string) {
    const region = await this.doGet<ResponseSuccess<IRegion[]>>(
      `/api/v1/region/list?countryId=${countryId}`
    );
    return region;
  }

  public async getLanguage() {
    const language = await this.doGet<ResponseSuccess<ILanguage[]>>(
      `/api/v1/language/list`
    );
    return language;
  }
}

const fieldsService = new FieldsService();

export default fieldsService;
