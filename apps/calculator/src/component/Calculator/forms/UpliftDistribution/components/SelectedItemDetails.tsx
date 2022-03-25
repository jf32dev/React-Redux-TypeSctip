import * as React from 'react';

import { File } from '@redbull/services';
import {
  Loader,
  ELoaderSize,
  useFlyin,
  getThemeByColour,
  TColourTheme,
} from '@redbull/components';

import { useTranslation } from 'react-i18next';
import { filterDataByQuery } from '../../../shared/utils';
import { Product, UpliftDistributionForm, QueryFormat } from '../store/type';

import { TSetValue } from '../../../shared/type';
import useGetSelectedProductImage from '../../../../../hooks/useGetSelectedProductImage';
import { DEFAULT_COLOUR_THEME } from '../../../shared/config';

import EnergyDrinkThumbnail from '../../../../../images/redbull-single.png';
import styles from './SelectedItemDetails.module.scss';

type Props = {
  fileData: Product[];
  images: File[];
  setValue: TSetValue<
    UpliftDistributionForm,
    { product: Product; image: string; theme: TColourTheme }
  >;
  values: UpliftDistributionForm;
};

const SelectedItemDetails = ({ fileData, images, setValue, values }: Props) => {
  const { t } = useTranslation();
  const { addFlyin } = useFlyin();

  const [productImageUrl, setProductImageUrl] = React.useState('');

  const { type, variant, size, pack } = values;

  const query: QueryFormat = {
    typeValue: type?.value,
    variantValue: variant?.value,
    sizeValue: size?.value,
    packValue: pack?.value,
  };

  const selectedProduct = filterDataByQuery<Product, QueryFormat>(
    fileData || [],
    query
  )[0];

  const [image, loading, imgError] = useGetSelectedProductImage(
    selectedProduct?.fileId,
    selectedProduct?.imageHub,
    images
  );

  const onImgError = () => {
    setProductImageUrl(EnergyDrinkThumbnail);
  };

  React.useEffect(() => {
    const theme =
      getThemeByColour(selectedProduct.backgroundColor) || DEFAULT_COLOUR_THEME;

    setValue('selected', {
      product: selectedProduct,
      image: productImageUrl,
      theme,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productImageUrl]);

  React.useEffect(() => {
    if (image && image.url) {
      setProductImageUrl(image.url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  React.useEffect(() => {
    if (imgError) {
      addFlyin(t('errorMessages.failedToLoadProductImage'), {
        id: 'Failed to load Product Image',
        type: 'warning',
      });
    }
  }, [addFlyin, imgError, t]);

  return (
    <div className={styles.content}>
      <div className={styles.thumb}>
        {loading ? (
          <Loader size={ELoaderSize.XSMALL} />
        ) : (
          <img
            alt={variant?.value}
            src={productImageUrl}
            onError={onImgError}
          />
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.type}>{variant?.value}</div>
        <div className={styles.details}>
          {size?.label}/{pack?.value}
        </div>
      </div>
    </div>
  );
};

export default SelectedItemDetails;
