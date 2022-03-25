import { camelCase, capitalize } from 'lodash';
import { SliderData } from '../../../api/services/slider/type';
import { FormValues, SliderFormRow } from './type';

import {
  between,
  composeValidation,
  greaterThan,
  lessThan,
  positiveNumber,
} from '../../../utils/validator';

export const mapDataToFormState = (data: SliderData[]) => {
  const stateObject: FormValues = {};

  data.forEach((row) => {
    const { sliderName, unit } = row;

    stateObject[camelCase(sliderName)] = {
      ...row,
      unit: {
        label: capitalize(unit),
        value: unit.toLowerCase(),
      },
    };
  });
  return stateObject;
};

export const mapFormStateToDataObject = (values: FormValues) => {
  let sliders: SliderData[] = [];

  Object.keys(values).forEach((slider) => {
    sliders = [
      ...sliders,
      {
        ...values[slider],
        unit: values[slider].unit.label,
      },
    ];
  });

  return sliders;
};

export const validateSliderForm = (values: FormValues) => {
  const errors: Record<
    keyof typeof values,
    Record<
      Extract<keyof SliderFormRow, 'min' | 'max' | 'defaultValue'>,
      string | undefined
    >
  > = {};

  Object.keys(values).forEach((key) => {
    const { min, max, defaultValue } = values[key];

    errors[key] = {
      min: composeValidation<number>(positiveNumber, lessThan(max))(+min),
      max: composeValidation<number>(positiveNumber, greaterThan(min))(+max),
      defaultValue: composeValidation<number>(
        positiveNumber,
        between(min, max)
      )(+defaultValue),
    };
  });
  return errors;
};
