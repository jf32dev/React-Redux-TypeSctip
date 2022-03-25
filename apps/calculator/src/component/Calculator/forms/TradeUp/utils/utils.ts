import { Product } from '../store/type';

export const formatSelectData = (fileData: any) => {
  const selectFields = {
    type: new Set(),
  };

  fileData.forEach((product: Product) => {
    selectFields.type.add(product.typeValue);
  });

  const formattedSelectData = Object.keys(selectFields).map((sel) => {
    return {
      name: sel,
      options: [...(selectFields as any)[sel]].map((opt: string) => ({
        label: opt,
        value: opt,
      })),
    };
  });

  return formattedSelectData;
};
