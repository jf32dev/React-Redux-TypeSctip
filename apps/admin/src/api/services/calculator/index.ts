import AdminService from '../../service';
import { ResponseSuccess } from '../../sharedType';
import { CalculatorData } from './type';

class Calculator extends AdminService {
  public async getAvailableCalculatorList(limit: number, offset: number = 0) {
    const calculators = await this.doGet<ResponseSuccess<CalculatorData[]>>(
      `/api/v1/generic-calculator/list?offset=${offset}&limit=${limit}`
    );
    return calculators;
  }
}

const calculatorService = new Calculator();
export default calculatorService;
