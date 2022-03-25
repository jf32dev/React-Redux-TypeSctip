import AdminService from '../../service';
import { ResponseSuccess } from '../../sharedType';
import { ICurrency, IFieldData } from './type';

class FieldsService extends AdminService {
  public async getFieldsByCalculatorId(calculatorId: string) {
    const fields = await this.doGet<ResponseSuccess<IFieldData[]>>(
      `/api/v1/generic-field/${calculatorId}`
    );
    return fields;
  }

  public async getCurrency() {
    const currencyResponse = await this.doGet<ResponseSuccess<ICurrency[]>>(
      `/api/v1/currency`
    );
    return currencyResponse;
  }
}

const fieldsService = new FieldsService();

export default fieldsService;
