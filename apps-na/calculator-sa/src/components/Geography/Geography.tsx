import * as React from 'react';
import { Accordion } from '@redbull/components';
import cx from 'classnames';
import Select from 'react-select';
import styles from './Geography.module.scss';

interface Props {
  handleSelectedStateOption: (e: any) => void;
  handleSelectedCityOption: (e: any) => void;
  handleSelectedDistributorOption: (e: any) => void;
  GeoMarkets: any;
  States: any;
  Cities: any;
  Distributors: any;
  selectedState: any;
  selectedCity: any;
  selectedDistributor: any;
  isDisabledCity: boolean;
  isDisabledState: boolean;
  isDisabledDistributor: boolean;
}

const Geography: React.FC<Props> = ({
  handleSelectedStateOption,
  handleSelectedCityOption,
  handleSelectedDistributorOption,
  States,
  Cities,
  Distributors,
  isDisabledCity,
  isDisabledState,
  isDisabledDistributor,
  selectedState,
  selectedCity,
  selectedDistributor,
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
    // <div className={styles.container}>
    <Accordion defaultExpanded={['Geography']}>
      <Accordion.Item
        id="Geography"
        title="SELECT GEOGRAPHY OR DISTRIBUTOR"
        onClick={handleAccordionClick}
      >
        <div className={styles.container}>
          <div className="geography-section">
            <div className="geography-select">
              <h3>Geography</h3>
              <div className={styles['geography-select-option']}>
                <Select
                  className={cx(styles['select-state'], styles.select)}
                  isDisabled={isDisabledState}
                  name="states"
                  options={States}
                  value={selectedState}
                  onChange={handleSelectedStateOption}
                />
                <Select
                  className={cx(styles['select-city'], styles.select)}
                  isDisabled={isDisabledCity}
                  name="cities"
                  options={Cities}
                  value={selectedCity}
                  onChange={handleSelectedCityOption}
                />
              </div>
            </div>
            <div className="distributor-select">
              <h3>Or</h3>
              <div className="">
                <Select
                  className={cx(styles['select-distributor'], styles.select)}
                  isDisabled={isDisabledDistributor}
                  name="distributors"
                  options={Distributors}
                  value={selectedDistributor}
                  onChange={handleSelectedDistributorOption}
                />
              </div>
            </div>
          </div>
        </div>
      </Accordion.Item>
    </Accordion>
    // </div>
  );
};

export default Geography;
