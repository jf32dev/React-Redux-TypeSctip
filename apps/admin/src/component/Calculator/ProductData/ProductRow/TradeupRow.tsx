import { Tooltip } from '@redbull/components';
import * as React from 'react';
import { TradeUp } from '../../../../api/services/product/type';
import styles from './ProductRow.module.scss';

type Props = {
  data: TradeUp;
};

const TradeupRow = ({ data }: Props) => (
  <>
    <td>{data.currencyValue}</td>
    <td>{data.typeValue}</td>
    <td>{data.multiplier355}</td>
    <td>{data.multiplier473}</td>
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

export default TradeupRow;
