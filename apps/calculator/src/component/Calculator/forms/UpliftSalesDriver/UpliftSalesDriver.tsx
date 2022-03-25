import React from 'react';
import { useDispatch } from 'react-redux';

import { useNumberParser } from '@redbull/common';
import { useFlyin, Loader, NoDataError } from '@redbull/components';

import { useTranslation } from 'react-i18next';
import CalculatorHeading from '../../components/CalculatorHeading';
import Wizard from '../../components/Wizard';
import EnterDetails from './components/EnterDetails';
import EnterPricing from './components/EnterPricing';
import Summary from './components/Summary';
import PictureIt from './components/PictureIt';
import SelectedItemDetails from './components/SelectedItemDetails';
import SalesDriverPdfDoc from './components/SalesDriverPdfDocument';

import { steps } from './utils/config';
import {
  DEFAULT_COLOUR_THEME,
  ECalculatorType,
  intlCurrencyOptions,
  intlUnitOptions,
} from '../../shared/config';
import { Driver, DriverForm } from './store/type';

import { mapConfigToField } from '../../../../utils/dataManipulator';
import {
  WizardHeadingRenderProps,
  WizardPageRenderProps,
} from '../../shared/type';
import { useTypedSelector } from '../../../../store';
import { uniqueCurrencies } from '../../shared/utils';
import {
  setAvailableCurrency,
  setSelectedCurrency,
} from '../../../../store/calculator/action';
import useGetCalculatorData from '../../../../hooks/useGetCalculatorData';

import ChilledCashierThumbnail from '../../../../images/chilled-cashier.png';

const Form = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { addFlyin } = useFlyin();

  const { selectedCountry, selectedCurrency } = useTypedSelector(
    (state) => state.calculator
  );

  const [, formatNumber] = useNumberParser(
    (selectedCurrency === 'EUR' && 'de-DE') || undefined
  );
  const {
    data,
    config,
    loading,
    error,
    images,
    getData,
  } = useGetCalculatorData<Driver>();

  const calcConfig = React.useMemo(() => mapConfigToField(config, 'name'), [
    config,
  ]);

  const [availableProducts, setAvailableProducts] = React.useState<Driver[]>(
    []
  );

  React.useEffect(() => {
    if (!loading && error) {
      addFlyin(error, {
        id: t('errorMessages.failedToLoadCalculatorData'),
        type: 'danger',
      });
    }
  }, [addFlyin, error, loading, t]);

  React.useEffect(() => {
    if (data) {
      const unique = uniqueCurrencies(data.map((f) => f.currencyValue));
      dispatch(setAvailableCurrency(unique));
      if (!selectedCurrency) {
        dispatch(setSelectedCurrency(unique[0]));
      }
      // filter product data by selected currency
      const products = data.filter(
        (product) => product.currencyValue === selectedCurrency
      );
      setAvailableProducts(products);
    }
  }, [data, dispatch, selectedCurrency]);

  React.useEffect(() => {
    if (selectedCountry) {
      getData(selectedCountry, ECalculatorType.UPLIFT_SALES_DRIVER, true);
    }
  }, [getData, selectedCountry]);

  // eslint-disable-next-line no-nested-ternary
  return error && !calcConfig ? (
    <NoDataError title={t('errorMessages.noData')}>
      {t('errorMessages.unauthorisedAccess')}
    </NoDataError>
  ) : !calcConfig ? (
    <Loader />
  ) : (
    <Wizard<DriverForm>
      calculator={ECalculatorType.UPLIFT_SALES_DRIVER}
      initialValues={{
        caseDeal: `${calcConfig?.caseDeal?.default || 0}`,
        costCase: `${calcConfig?.costCase?.default || 0}`,
        estUplift: `${calcConfig?.estUplift?.default || 0}`,
        currentWeeklySales: `${calcConfig?.currentWeeklySales?.default || 0}`,
        customerSellingPrice: `${
          calcConfig?.customerSellingPrice?.default || 0
        }`,
      }}
      steps={steps()}
    >
      <Wizard.Heading>
        {({
          activePage,
          resetForm,
          setValue,
          values,
        }: WizardHeadingRenderProps<
          DriverForm,
          { product: Driver; image: string }
        >) => {
          return (
            <CalculatorHeading
              activePage={activePage}
              resetForm={resetForm}
              title={t('general.upliftSalesDriver')}
            >
              <SelectedItemDetails
                fileData={availableProducts}
                images={images}
                setValue={setValue}
                values={values}
              />
            </CalculatorHeading>
          );
        }}
      </Wizard.Heading>
      <Wizard.Page>
        {({ values, setValue }: WizardPageRenderProps<DriverForm>) => (
          <EnterDetails
            fileData={availableProducts}
            setValue={setValue}
            values={values}
          />
        )}
      </Wizard.Page>
      <Wizard.Page>
        <EnterPricing config={calcConfig} />
      </Wizard.Page>
      <Wizard.Page>
        {({ values, setValue }: WizardPageRenderProps<DriverForm>) => (
          <Summary setValue={setValue} values={values} />
        )}
      </Wizard.Page>
      <Wizard.Page>
        {({ values }: WizardPageRenderProps<DriverForm>) => (
          <PictureIt values={values} />
        )}
      </Wizard.Page>
      <Wizard.PdfToRender>
        {({ values }: { values: DriverForm }) => {
          const {
            estWeeklySales,
            estAnnualSales,
            estAnnualProfit,
            salesDriver,
            selected,
          } = values;
          return (
            <SalesDriverPdfDoc
              backgroundColor={selected?.product.backgroundColor || ''}
              colourTheme={selected?.theme || DEFAULT_COLOUR_THEME}
              estAnnualProfit={formatNumber(estAnnualProfit, {
                ...intlCurrencyOptions,
                ...(selectedCurrency && {
                  style: 'currency',
                  currency: selectedCurrency,
                }),
              })}
              estAnnualSales={formatNumber(estAnnualSales, {
                ...intlCurrencyOptions,
                ...(selectedCurrency && {
                  style: 'currency',
                  currency: selectedCurrency,
                }),
              })}
              estWeeklySales={formatNumber(estWeeklySales, intlUnitOptions)}
              image={selected?.image || ChilledCashierThumbnail}
              tool={salesDriver?.value || ''}
            />
          );
        }}
      </Wizard.PdfToRender>
    </Wizard>
  );
};

export default Form;
