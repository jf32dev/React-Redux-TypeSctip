import { Driver } from '../store/type';

export const formatSelectData = (fileData: Driver[]) => {
  const selectFields = {
    type: new Set(),
    salesDriver: new Set(),
  };

  fileData.forEach((product: Driver) => {
    selectFields.type.add(product.typeValue);
    selectFields.salesDriver.add(product.salesDriverValue);
  });

  const formattedSelectData = Object.keys(selectFields).map((sel) => ({
    name: sel,
    options: [...(selectFields as any)[sel]].map((opt: string) => ({
      label: opt,
      value: opt,
    })),
  }));

  return formattedSelectData;
};
