import { Product } from '../store/type';

export const formatSelectData = (fileData: Product[]) => {
  const selectFields: Record<string, Set<string>> = {
    type: new Set<string>(),
    variant: new Set<string>(),
    size: new Set<string>(),
    pack: new Set<string>(),
  };

  fileData.forEach((product: Product) => {
    selectFields.type.add(product.typeValue);
    selectFields.variant.add(product.variantValue);
    selectFields.size.add(product.sizeValue);
    selectFields.pack.add(product.packValue);
  });
  const formattedSelectData = Object.keys(selectFields).map((sel) => {
    if (sel === 'size') {
      return {
        name: sel,
        options: Array.from(selectFields[sel]).map((opt: string) => ({
          label: `${opt}ml`,
          value: opt,
        })),
      };
    }
    return {
      name: sel,
      options: Array.from(selectFields[sel]).map((opt: string) => ({
        label: opt,
        value: opt,
      })),
    };
  });
  return formattedSelectData;
};
