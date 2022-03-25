import { CalculatorType } from '../../../api/services/calculator/type';
import { IFieldSelect } from '../../../api/services/fields/type';
import { Product } from '../../../api/services/product/type';
import { ProductFormType } from './type';

const isSelectField = (fieldName: string, fields: IFieldSelect[]): boolean =>
  !!fields.find((field) => field.name === fieldName);

const fieldAliases: Record<string, string> = {
  Taxes: 'Taxes (%)',
  Multiplier355: '355ml (%)',
  Multiplier473: '473ml (%)',
};

/**
 * Exclude fields to be included in Form State Object
 */
const excludeFields = [
  'calculatorId',
  'country',
  'fileId',
  'formType',
  'imageHub',
  'imageServer',
  'id',
  'preview',
];

/**
 * Find field synonym name
 */
export const fieldsMap = (name: string) =>
  fieldAliases[name] ? fieldAliases[name] : name;

export const mapDataToStateObject = (
  data: Product | null,
  calcType: CalculatorType,
  selectFields: IFieldSelect[]
) => {
  const stateObject: any = {};

  if (data) {
    Object.keys(data).forEach((fieldName) => {
      // exclude values since selection is not determine by values.
      if (!fieldName.match(/.+Value/gi)) {
        // Select Fields:
        // packValue: '24  Pack' -> selected option label
        // pack: 'aa379178-a891-4b3c-b1a5-940f1a33241f' -> selected option value
        if (isSelectField(fieldName, selectFields)) {
          const fieldValue = data[fieldName];
          const fieldLabel = data[`${fieldName}Value`];
          if (fieldValue && fieldLabel) {
            stateObject[fieldName] = {
              value: fieldValue,
              label: `${fieldLabel}${fieldName === 'size' ? 'ml' : ''}`,
            };
          }
        }
        // Input fields
        if (!isSelectField(fieldName, selectFields)) {
          stateObject[fieldName] = data[fieldName];
        }
        if (fieldName === 'imageServer') {
          stateObject.preview = data[fieldName];
          stateObject.image = data.image;
        }
      }
    });
  }

  stateObject.formType = calcType;
  return stateObject as ProductFormType;
};

export const mapFormStateToDataObject = (stateObject: ProductFormType) => {
  const dataObject: any = {};

  Object.keys(stateObject).forEach((fieldName) => {
    if (!fieldName.match(/.+Value/gi) && !excludeFields.includes(fieldName)) {
      const field = stateObject[fieldName as keyof ProductFormType];
      if (typeof field === 'object') {
        dataObject[fieldName] = field.value;
      } else {
        dataObject[fieldName] = field;
      }
    }
  });
  return dataObject;
};
