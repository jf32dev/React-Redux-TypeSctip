import * as React from 'react';
import { useDispatch } from 'react-redux';

import { useNumberParser } from '@redbull/common';
import {
  useFlyin,
  Loader,
  NoDataError,
  TColourTheme,
} from '@redbull/components';

import { useTranslation } from 'react-i18next';
import Wizard from '../../components/Wizard';
import CalculatorHeading from '../../components/CalculatorHeading';
import EnterDetails from './components/EnterDetails';
import Summary from './components/Summary';
import PictureIt from './components/PictureIt';
import TradeUpPdfDocument from './components/TradeUpPdfDocument';

import { Product, TradeUpForm } from './store/type';
import { steps } from './utils/config';
import {
  DEFAULT_COLOUR_THEME,
  ECalculatorType,
  intlCurrencyOptions,
} from '../../shared/config';

import { mapConfigToField } from '../../../../utils/dataManipulator';
import {
  WizardPageRenderProps,
  WizardHeadingRenderProps,
} from '../../shared/type';
import { useTypedSelector } from '../../../../store';
import { uniqueCurrencies } from '../../shared/utils';
import {
  setAvailableCurrency,
  setSelectedCurrency,
} from '../../../../store/calculator/action';
import useGetCalculatorData from '../../../../hooks/useGetCalculatorData';

const Form = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { addFlyin } = useFlyin();

  const { selectedCountry, selectedCurrency } = useTypedSelector(
    (state) => state.calculator
  );

  const [, formatNumber, toNumber] = useNumberParser(
    (selectedCurrency === 'EUR' && 'de-DE') || undefined
  );
  const { data, config, loading, error, getData } = useGetCalculatorData<
    Product
  >();

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
      getData(selectedCountry, ECalculatorType.TRADE_UP, true);
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
    <Wizard<TradeUpForm>
      calculator={ECalculatorType.TRADE_UP}
      initialValues={{
        shelfPrice: `${calcConfig?.shelfPrice?.default || 0}`,
      }}
      steps={steps()}
    >
      <Wizard.Heading>
        {({ activePage, resetForm }: WizardHeadingRenderProps<TradeUpForm>) => {
          return (
            <CalculatorHeading
              activePage={activePage}
              resetForm={resetForm}
              title={t('general.tradeUp')}
            />
          );
        }}
      </Wizard.Heading>
      <Wizard.Page>
        {({ values, setValue }: WizardPageRenderProps<TradeUpForm>) => (
          <EnterDetails
            config={calcConfig}
            fileData={availableProducts}
            setValue={setValue}
            values={values}
          />
        )}
      </Wizard.Page>
      <Wizard.Page>
        {({
          setValue,
          values,
        }: WizardPageRenderProps<
          TradeUpForm,
          number | { backgroundColor: string; theme: TColourTheme }
        >) => (
          <Summary
            fileData={availableProducts}
            setValue={setValue}
            values={values}
          />
        )}
      </Wizard.Page>
      <Wizard.Page>
        {({ values }: WizardPageRenderProps<TradeUpForm>) => (
          <PictureIt values={values} />
        )}
      </Wizard.Page>
      <Wizard.PdfToRender>
        {({ values }: { values: TradeUpForm }) => {
          const {
            selected,
            shelfPrice,
            mediumShelfPrice,
            largeShelfPrice,
            shelfPricePerLitre,
            mediumShelfPricePerLitre,
            largeShelfPricePerLitre,
          } = values;
          return (
            <TradeUpPdfDocument
              backgroundColor={selected?.backgroundColor || ''}
              colorTheme={selected?.theme || DEFAULT_COLOUR_THEME}
              largeShelfPrice={formatNumber(largeShelfPrice, {
                ...intlCurrencyOptions,
                ...(selectedCurrency && {
                  style: 'currency',
                  currency: selectedCurrency,
                }),
              })}
              largeShelfPricePerLitre={formatNumber(largeShelfPricePerLitre, {
                ...intlCurrencyOptions,
                ...(selectedCurrency && {
                  style: 'currency',
                  currency: selectedCurrency,
                }),
              })}
              mediumShelfPrice={formatNumber(mediumShelfPrice, {
                ...intlCurrencyOptions,
                ...(selectedCurrency && {
                  style: 'currency',
                  currency: selectedCurrency,
                }),
              })}
              mediumShelfPricePerLitre={formatNumber(mediumShelfPricePerLitre, {
                ...intlCurrencyOptions,
                ...(selectedCurrency && {
                  style: 'currency',
                  currency: selectedCurrency,
                }),
              })}
              shelfPrice={formatNumber(toNumber(shelfPrice), {
                ...intlCurrencyOptions,
                ...(selectedCurrency && {
                  style: 'currency',
                  currency: selectedCurrency,
                }),
              })}
              shelfPricePerLitre={formatNumber(shelfPricePerLitre, {
                ...intlCurrencyOptions,
                ...(selectedCurrency && {
                  style: 'currency',
                  currency: selectedCurrency,
                }),
              })}
            />
          );
        }}
      </Wizard.PdfToRender>
    </Wizard>
  );
};

export default Form;
