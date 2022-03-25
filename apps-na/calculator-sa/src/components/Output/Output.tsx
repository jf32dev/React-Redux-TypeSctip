import * as React from 'react';
import { Accordion } from '@redbull/components';
import cx from 'classnames';
import styles from './Output.module.scss';

type SelectedDistributor = {
  value: string;
};

type Itemlist = {
  [key: string]: any;
};

type DistributorList = {
  [key: string]: any;
};

interface Props {
  checked: boolean;
  list: Itemlist[];
  distributorList: DistributorList[];
  selectedDistributor: SelectedDistributor;
  inputValue: any;
  totalValue: number;
}

const Output: React.FC<Props> = ({
  checked,
  list,
  distributorList,
  selectedDistributor,
  inputValue,
  totalValue,
}) => {
  const handleAccordionClick = (accordion: HTMLDivElement) => {
    setTimeout(
      () =>
        accordion.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        }),
      200
    );
  };

  return (
    <Accordion defaultExpanded={['output']}>
      <Accordion.Item id="output" title="OUTPUT" onClick={handleAccordionClick}>
        <div className={styles.container}>
          <div className={styles['output-table']}>
            <table>
              <thead>
                <tr>
                  <th
                    aria-label="aa"
                    className={`${
                      !checked
                        ? cx(styles['column-1'], styles['font-position'])
                        : cx(styles.column, styles['font-position'])
                    }`}
                  />
                  <th
                    className={cx(styles['column-2'], styles['font-position'])}
                  >
                    STORE&apos;S CURRENT SPACE %
                  </th>
                  {!checked && (
                    <th
                      className={cx(
                        styles['column-3'],
                        styles['font-position']
                      )}
                    >
                      GROWTH % VS. PY
                    </th>
                  )}
                  <th
                    className={cx(styles['column-4'], styles['font-position'])}
                  >
                    SELECTED MARKET $ SALES %
                  </th>
                  <th
                    className={cx(styles['column-5'], styles['font-position'])}
                  >
                    SELECTED MARKET RECO OF SHELVES
                  </th>
                  <th
                    className={cx(styles['column-6'], styles['font-position'])}
                  >
                    RECO CHANGE OF SHELVES
                  </th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {selectedDistributor.value === 'Select distributor'
                  ? list.map((item) => (
                      <tr key={item.id}>
                        <td
                          className={`${
                            !checked ? styles['column-1'] : styles.column
                          }`}
                        >
                          {item.Category}
                        </td>
                        {inputValue[item.Category] === null ? (
                          <td className={styles['column-2']}>%</td>
                        ) : (
                          <td className={styles['column-2']}>
                            {(
                              (Number(inputValue[item.Category]) /
                                Number(totalValue)) *
                              100
                            ).toFixed()}
                            %
                          </td>
                        )}
                        {!checked && (
                          <td className={styles['column-3']}>
                            {item.YearGrowthPercent}%
                          </td>
                        )}
                        {item.MarketSalesPercent ? (
                          <td className={styles['column-4']}>
                            {Number(item.MarketSalesPercent).toFixed()}%
                          </td>
                        ) : (
                          <td className={styles['column-4']}>%</td>
                        )}
                        {item.MarketSalesPercent ? (
                          <td className={styles['column-5']}>
                            {Math.round(
                              Number(Number(item.MarketSalesPercent) / 100) *
                                Number(totalValue)
                            ).toFixed()}
                          </td>
                        ) : (
                          <td className={styles['column-5']} />
                        )}
                        {item.MarketSalesPercent ? (
                          <td className={styles['column-6']}>
                            {Math.round(
                              Number(Number(item.MarketSalesPercent) / 100) *
                                Number(totalValue)
                            ) - inputValue[item.Category]}
                          </td>
                        ) : (
                          <td className={styles['column-6']}>
                            {0 - inputValue[item.Category]}
                          </td>
                        )}
                      </tr>
                    ))
                  : distributorList.map((dis) => (
                      <tr key={dis.id}>
                        <td
                          className={`${
                            !checked ? styles['column-1'] : styles.column
                          }`}
                        >
                          {dis.Type}
                        </td>
                        {inputValue[dis.Type] === null ? (
                          <td className={styles['column-2']}>%</td>
                        ) : (
                          <td className={styles['column-2']}>
                            {(
                              (Number(inputValue[dis.Type]) /
                                Number(totalValue)) *
                              100
                            ).toFixed()}
                            %
                          </td>
                        )}
                        {!checked && (
                          <td className={styles['column-3']}>
                            {dis.YearGrowthPercent} %
                          </td>
                        )}
                        {dis.MarketSalesPercent ? (
                          <td className={styles['column-4']}>
                            {Number(dis.MarketSalesPercent).toFixed()} %
                          </td>
                        ) : (
                          <td className={styles['column-4']}>%</td>
                        )}
                        {dis.MarketSalesPercent ? (
                          <td className={styles['column-5']}>
                            {Math.round(
                              Number(Number(dis.MarketSalesPercent) / 100) *
                                Number(totalValue)
                            ).toFixed()}
                          </td>
                        ) : (
                          <td className={styles['column-5']} />
                        )}
                        {dis.MarketSalesPercent ? (
                          <td className={styles['column-6']}>
                            {Math.round(
                              Number(Number(dis.MarketSalesPercent) / 100) *
                                Number(totalValue)
                            ) - inputValue[dis.Type]}
                          </td>
                        ) : (
                          <td className={styles['column-6']}>
                            {0 - inputValue[dis.Type]}
                          </td>
                        )}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </Accordion.Item>
    </Accordion>
  );
};

export default Output;
