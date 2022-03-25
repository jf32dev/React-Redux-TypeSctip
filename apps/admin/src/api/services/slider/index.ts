import AdminService from '../../service';
import { ResponseSuccess } from '../../sharedType';
import { SliderData, SliderDataUpdate } from './type';

class SliderService extends AdminService {
  public async getSliderByCalculatorId(calculatorId: string) {
    const sliders = await this.doGet<ResponseSuccess<SliderData[]>>(
      `/api/v1/generic-slider/${calculatorId}`
    );
    return sliders;
  }

  public async updateSlider(sliderData: SliderDataUpdate) {
    const product = await this.doPut<ResponseSuccess<SliderData[]>>(
      `/api/v1/generic-slider/update`,
      sliderData
    );
    return product;
  }
}

const sliderService = new SliderService();

export default sliderService;
