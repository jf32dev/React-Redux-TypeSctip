import * as React from 'react';
import { ReactComponent as CrossIcon } from '@redbull/common/icons/cross.svg';
import { Tooltip } from '@redbull/components';
import { UpliftDistribution } from '../../../../api/services/product/type';
import styles from './ProductRow.module.scss';

type Props = {
  data: UpliftDistribution;
};

const UpliftDistributionRow = ({ data }: Props) => {
  const [imageError, setImageError] = React.useState<boolean>(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <td>{data.currencyValue}</td>
      <td>{data.typeValue}</td>
      <td>{data.variantValue}</td>
      <td>{data.sizeValue}ml</td>
      <td>{data.packValue}</td>
      <td>{data.unitPerCase}</td>
      <td>{data.taxes}</td>
      <td>
        {!imageError ? (
          <img
            alt={data.size}
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

export default UpliftDistributionRow;
