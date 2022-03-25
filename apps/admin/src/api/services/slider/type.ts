interface SliderBase {
  id: string;
  min: number;
  max: number;
  defaultValue: number;
  unit: string;
}

export interface SliderData extends SliderBase {
  sliderName: string;
  calculatorId: string;
}

export interface SliderDataUpdate {
  calculatorId: string;
  sliders: SliderBase[];
}
