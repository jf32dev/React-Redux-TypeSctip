import * as React from 'react';
import { ReactComponent as CrossIcon } from '@redbull/common/icons/cross.svg';
import { Tooltip } from '@redbull/components';
import { UpliftSalesDriver } from '../../../../api/services/product/type';
import styles from './ProductRow.module.scss';

type Props = {
  data: UpliftSalesDriver;
};

const SalesDriverRow = ({ data }: Props) => {
  const [imageError, setImageError] = React.useState<boolean>(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <td>{data.currencyValue}</td>
      <td>{data.typeValue}</td>
      <td>{data.salesDriverValue}</td>
      <td>{data.unitPerCase}</td>
      <td>{data.taxes}</td>
      <td>
        {!imageError ? (
          <img
            alt={data.salesDriverValue}
            src={data.imageServer}
            onError={handleImageError}
          />
        ) : (
          <CrossIcon className={styles['image-error-icon']} />
        )}
      </td>
      <td>
        <Tooltip text={data.backgroundColor}>
          <div
            className={styles.background}
            style={{ backgroundColor: data.backgroundColor }}
          />
        </Tooltip>
      </td>
    </>
  );
};

export default SalesDriverRow;
