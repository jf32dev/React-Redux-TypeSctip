import * as React from 'react';

import { File } from '@redbull/services';
import {
  useFlyin,
  ELoaderSize,
  Loader,
  getThemeByColour,
  TColourTheme,
} from '@redbull/components';

import { useTranslation } from 'react-i18next';
import { filterDataByQuery } from '../../../shared/utils';
import { Driver, DriverForm, QueryFormat } from '../store/type';
import { TSetValue } from '../../../shared/type';

import useGetSelectedProductImage from '../../../../../hooks/useGetSelectedProductImage';

import ChilledCashierThumbnail from '../../../../../images/chilled-cashier.png';
import styles from './SelectedItemDetails.module.scss';
import { DEFAULT_COLOUR_THEME } from '../../../shared/config';

type Props = {
  fileData: Driver[];
  images: File[];
  setValue: TSetValue<
    DriverForm,
    { product: Driver; image: string; theme: TColourTheme }
  >;
  values: DriverForm;
};

const SelectedItemDetails = ({ fileData, images, setValue, values }: Props) => {
  const { t } = useTranslation();
  const [productImageUrl, setProductImageUrl] = React.useState('');

  const { type, salesDriver } = values;
  const { addFlyin } = useFlyin();

  const query: QueryFormat = {
    typeValue: type?.value,
    salesDriverValue: salesDriver?.value,
  };

  const selectedProduct = filterDataByQuery<Driver, QueryFormat>(
    fileData || [],
    query
  )[0];

  const [image, loading, imgError] = useGetSelectedProductImage(
    selectedProduct.fileId,
    selectedProduct.imageHub,
    images
  );

  const onImgError = () => {
    setProductImageUrl(ChilledCashierThumbnail);
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
      addFlyin(t('errorMessages.failedToLoadDriverImage'), {
        id: 'Failed to load Driver Image',
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
            alt={salesDriver?.value}
            src={productImageUrl}
            onError={onImgError}
          />
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.type}>{salesDriver?.value}</div>
      </div>
    </div>
  );
};

export default SelectedItemDetails;
