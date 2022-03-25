import * as React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ReactComponent as Dustbin } from '@redbull/common/icons/dustbin.svg';
import { ReactComponent as Pencil } from '@redbull/common/icons/pencil.svg';
import { ELoaderSize, Loader } from '@redbull/components';

import { deleteProduct } from '../../../../store/product/action';
import { CalculatorType } from '../../../../api/services/calculator/type';
import {
  Product,
  TradeUp,
  UpliftDistribution,
  UpliftSalesDriver,
} from '../../../../api/services/product/type';

import Table from '../../Table';
import TradeupRow from './TradeupRow';
import UpliftDistributionRow from './UpliftDistributionRow';
import SalesDriverRow from './SalesDriverRow';

import styles from './ProductRow.module.scss';

type Props = {
  data: Product;
  isDeleting: string | null;
  type: CalculatorType;
};

const ProductRow = ({ isDeleting, data, type }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();

  const handleEdit = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const target = e.target as SVGSVGElement;
    const { productId } = target.dataset;
    if (productId) {
      history.push(`${url}/edit/${productId}`);
    }
  };

  const handleDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const target = e.target as SVGSVGElement;
    const { productId } = target.dataset;
    if (productId) dispatch(deleteProduct(productId));
  };

  let productRow = null;

  switch (type) {
    case 'trade-up':
      productRow = <TradeupRow data={data as TradeUp} />;
      break;
    case 'uplift-distribution':
      productRow = <UpliftDistributionRow data={data as UpliftDistribution} />;
      break;
    case 'uplift-sales-driver':
      productRow = <SalesDriverRow data={data as UpliftSalesDriver} />;
      break;
    default:
      return null;
  }

  return (
    <Table.Row className={styles.row}>
      {productRow}
      <td className={styles.action}>
        <div className={styles.icons}>
          <Pencil data-product-id={data.id} onClick={handleEdit} />
          {isDeleting === data.id ? (
            <Loader className={styles.loader} size={ELoaderSize.XSMALL} />
          ) : (
            <Dustbin data-product-id={data.id} onClick={handleDelete} />
          )}
        </div>
      </td>
    </Table.Row>
  );
};

export default ProductRow;
