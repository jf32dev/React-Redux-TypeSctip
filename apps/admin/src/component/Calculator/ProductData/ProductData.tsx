import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import cx from 'classnames';

import {
  Button,
  EButtonVariant,
  Loader,
  NoDataError,
  useFlyin,
} from '@redbull/components';

import { CountryCode, isCountryCode } from '@redbull/common';
import { ReactComponent as Plus } from '@redbull/common/icons/plus.svg';

import CalculatorLayout from '../CalculatorLayout';
import ProductRow from './ProductRow';
import Table from '../Table';

import { useTypedSelector } from '../../../store';
import {
  getProductListData,
  clearProductListData,
} from '../../../store/product/action';
import { CalculatorType } from '../../../api/services/calculator/type';
import { calculatorHeader } from './config';

import styles from './ProductData.module.scss';

type TParams = {
  dataType: 'data';
  country: CountryCode;
  calcType: CalculatorType;
  calcId: string;
};

const ProductData = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { addFlyin } = useFlyin();

  const { calcType, country, calcId } = useParams<TParams>();
  const { data, status, hasMore, isDeleting, deleteError } = useTypedSelector(
    (state) => state.product.productList
  );
  const [header, setHeader] = React.useState<string[]>([]);
  const [valid, setValid] = React.useState(true);
  const isFirstLoad = data.length === 0 && status === 'loading';

  const handleBack = () => {
    history.push('/calculator');
  };

  const handleAdd = () => {
    history.push(`${url}/add`);
  };

  const handleLoadMore = () => {
    if (hasMore && status !== 'loading') {
      if (isCountryCode(country) && calcId) {
        dispatch(getProductListData(calcId));
      }
    }
  };

  React.useEffect(() => {
    if (isCountryCode(country) && calcId) {
      setHeader(calculatorHeader[calcType]);
      dispatch(getProductListData(calcId));
    } else {
      setValid(false);
    }
  }, [calcId, calcType, country, dispatch]);

  React.useEffect(() => {
    return () => {
      dispatch(clearProductListData());
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (deleteError) {
      addFlyin(deleteError, { type: 'danger' });
    }
  }, [addFlyin, deleteError]);

  return (
    <CalculatorLayout>
      <div className={styles.content}>
        {!valid && (
          <NoDataError
            className={styles['invalid-calculator']}
            title="Invalid Calculator"
          />
        )}
        {valid && (
          <>
            {isFirstLoad && <Loader className={styles.loading} />}
            {!isFirstLoad && data.length === 0 && (
              <NoDataError className={styles.nodata} title="No data available">
                Add new data by clicking the plus button
              </NoDataError>
            )}
            <Table
              className={styles.table}
              extraHeaders={
                <th className={cx(styles.header, styles.action)} scope="col">
                  <div className={styles.icons}>
                    <Plus onClick={handleAdd} />
                  </div>
                </th>
              }
              headers={header}
              scrollable
              onScrollEnd={handleLoadMore}
            >
              {data.map((product) => (
                <ProductRow
                  key={product.id}
                  data={product}
                  isDeleting={isDeleting}
                  type={calcType as CalculatorType}
                />
              ))}
              {status === 'loading' && !isFirstLoad && (
                <tr className={styles['loader-row']}>
                  <td>
                    <Loader text="loading more..." />
                  </td>
                </tr>
              )}
            </Table>
          </>
        )}
        <div className={styles.footer}>
          <Button variant={EButtonVariant.SECONDARY} onClick={handleBack}>
            Back
          </Button>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default ProductData;
