import * as React from 'react';
import cx from 'classnames';
import { capitalize, startCase } from 'lodash';
import { useHistory, useParams } from 'react-router-dom';
import { ReactComponent as Chevron } from '@redbull/common/icons/chevron.svg';
import { Breadcrumb } from './type';
import styles from './Breadcrumbs.module.scss';

const DEFAULT_BREADCRUMBS: Breadcrumb[] = [
  {
    calcId: 'root',
    label: 'Wingtips Calculator Data',
    disabled: true,
  },
  {
    calcId: 'calculator',
    label: 'Select Calculator',
  },
];

const Breadcrumbs = () => {
  const history = useHistory();
  const params = useParams<
    Pick<Breadcrumb, 'dataType' | 'calcType' | 'country' | 'calcId' | 'action'>
  >();
  const { dataType, calcType, country, calcId, action } = params;

  const [breadcrumbs, setBreadcrumbs] = React.useState<Breadcrumb[]>(
    DEFAULT_BREADCRUMBS
  );

  const handleBreadcrumbClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLDivElement;
    const { cType, type, cCountry, cId } = target.dataset;
    if (type && cCountry && cType && cId) {
      history.push(`/calculator/${type}/${cCountry}/${cType}/${cId}`);
    } else {
      history.push(`/calculator`);
    }
  };

  const buildBreadcrumbs = React.useCallback(() => {
    if (dataType && calcType && country) {
      const label = `${country} - ${startCase(calcType)} ${startCase(
        dataType
      )}`;
      const crumbs: Breadcrumb[] = [
        {
          calcId,
          label,
          country,
          calcType,
          dataType,
        },
      ];
      if (action) {
        crumbs.push({
          label: `${capitalize(action)} Product`,
          calcId: 'product-action',
        });
      }
      setBreadcrumbs((bc) => [...bc, ...crumbs]);
    } else {
      setBreadcrumbs(DEFAULT_BREADCRUMBS);
    }
  }, [dataType, calcType, country, calcId, action]);

  React.useEffect(() => {
    buildBreadcrumbs();
  }, [buildBreadcrumbs, dataType, calcType, country, calcId, action]);

  return (
    <div className={styles.container}>
      {breadcrumbs.map((c: Breadcrumb) => {
        return (
          <div
            key={c.calcId}
            className={cx(styles.item, c.disabled && styles.disabled)}
          >
            <Chevron className={styles.icon} />
            <div
              data-c-country={c.country}
              data-c-id={c.calcId}
              data-c-type={c.calcType}
              data-label={c.label}
              data-type={c.dataType}
              onClick={handleBreadcrumbClick}
            >
              {c.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
