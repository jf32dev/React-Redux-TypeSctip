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
import PdfDocument from './components/PdfDocument';

import { steps } from './utils/config';
import {
  DEFAULT_COLOUR_THEME,
  ECalculatorType,
  intlCurrencyOptions,
  intlUnitOptions,
} from '../../shared/config';
import { Product, UpliftDistributionForm } from './store/type';
import EnergyDrinkThumbnail from '../../../../images/redbull-single.png';

import {
  WizardPageRenderProps,
  WizardHeadingRenderProps,
} from '../../shared/type';
import { useTypedSelector } from '../../../../store';
import {
  setAvailableCurrency,
  setSelectedCurrency,
} from '../../../../store/calculator/action';
import { uniqueCurrencies } from '../../shared/utils';
import { mapConfigToField } from '../../../../utils/dataManipulator';
import useGetCalculatorData from '../../../../hooks/useGetCalculatorData';
import SelectedItemDetails from './components/SelectedItemDetails';

const Form = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { addFlyin } = useFlyin();

  const { selectedCurrency, selectedCountry } = useTypedSelector(
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
  } = useGetCalculatorData<Product>();

  const calcConfig = React.useMemo(() => mapConfigToField(config, 'name'), [
    config,
  ]);

  const [availableProducts, setAvailableProducts] = React.useState<Product[]>(
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
      // set first currency as default
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
      getData(selectedCountry, ECalculatorType.UPLIFT_DISTRIBUTION, true);
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
    <Wizard<UpliftDistributionForm>
      // initial values have to be set on the form level,
      // passing them to individual fields does not work
      // for multipage forms
      calculator={ECalculatorType.UPLIFT_DISTRIBUTION}
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
          UpliftDistributionForm,
          { product: Product; image: string }
        >) => (
          <CalculatorHeading
            activePage={activePage}
            resetForm={resetForm}
            title={t('general.upliftDistribution')}
          >
            <SelectedItemDetails
              fileData={availableProducts}
              images={images}
              setValue={setValue}
              values={values}
            />
          </CalculatorHeading>
        )}
      </Wizard.Heading>

      <Wizard.Page>
        {({
          setValue,
          values,
        }: WizardPageRenderProps<UpliftDistributionForm>) => (
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
        {({
          values,
          setValue,
        }: WizardPageRenderProps<UpliftDistributionForm>) => (
          <Summary setValue={setValue} values={values} />
        )}
      </Wizard.Page>
      <Wizard.Page>
        {({ values }: WizardPageRenderProps<UpliftDistributionForm>) => (
          <PictureIt values={values} />
        )}
      </Wizard.Page>

      <Wizard.PdfToRender>
        {({ values }: { values: UpliftDistributionForm }) => {
          const {
            estWeeklySales,
            estAnnualSales,
            estAnnualProfit,
            variant,
            size,
            pack,
            selected,
          } = values;
          // We have to pass processed values because the PdfDocument
          // is technically outside the Final Form hence we cannot
          // pull the values within the component using useFormState()
          return (
            <PdfDocument
              backgroundColor={selected?.product.backgroundColor || ''}
              colorTheme={selected?.theme || DEFAULT_COLOUR_THEME}
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
              image={selected?.image || EnergyDrinkThumbnail}
              pack={size?.value || ''}
              size={pack?.value || ''}
              variant={variant?.value || ''}
            />
          );
        }}
      </Wizard.PdfToRender>
    </Wizard>
  );
};

export default Form;
