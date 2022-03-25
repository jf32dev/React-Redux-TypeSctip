import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FormSpy, withTypes } from 'react-final-form';
import { Mutator } from 'final-form';
import {
  Button,
  EButtonVariant,
  Loader,
  NoDataError,
  useFlyin,
} from '@redbull/components';

import {
  getSliderList,
  saveSlider,
  clearSliderData,
} from '../../../store/slider/action';
import { useTypedSelector } from '../../../store';

import { FieldPrefix } from '../FormFields';
import CalculatorLayout from '../CalculatorLayout';
import SliderRow from './components/SliderRow';
import TableHeading from './components/TableHeading';

import { FormValues, RouteParams } from './type';
import {
  mapDataToFormState,
  mapFormStateToDataObject,
  validateSliderForm,
} from './utils';

import styles from './SliderData.module.scss';

const SlidersData = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams<RouteParams>();
  const { calcId: calculatorId } = params;

  const { addFlyin } = useFlyin();

  const { Form } = withTypes<FormValues>();

  const { data, error, status, isSaving, savingError } = useTypedSelector(
    (state) => state.slider
  );

  const [initialValues, setInitialValues] = React.useState({});

  const handleBack = () => {
    history.push('/calculator');
  };

  const handleFormSubmit = (values: FormValues) => {
    const objectData = {
      calculatorId,
      sliders: mapFormStateToDataObject(values),
    };
    dispatch(saveSlider(objectData));
  };

  const setValue: Mutator<FormValues> = (
    [field, value],
    state,
    { changeValue }
  ) => {
    changeValue(state, field, () => value);
  };

  React.useEffect(() => {
    if (!data.length && calculatorId) {
      dispatch(getSliderList(calculatorId));
    }
  }, [calculatorId, data.length, dispatch]);

  React.useEffect(() => {
    if (data.length > 0) {
      const sliders = mapDataToFormState(data);
      setInitialValues(sliders);
    }
  }, [data]);

  React.useEffect(() => {
    return () => {
      dispatch(clearSliderData());
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (savingError) {
      addFlyin(savingError, { type: 'danger' });
    }
  }, [addFlyin, savingError]);

  return (
    <CalculatorLayout>
      {status === 'loading' && <Loader className={styles.loader} />}
      {status === 'failed' && error && (
        <NoDataError className={styles.error} title="Error loading the form.">
          There was an error loading the form or the product you selected.
          <br />
          Please try again.
        </NoDataError>
      )}
      {status === 'succeeded' && (
        <Form
          initialValues={initialValues}
          mutators={{
            setValue,
          }}
          subscription={{
            initialValues: true,
          }}
          /**
           * NOTE:
           * Record/Form level validation is choosen to validate slider form.
           * Field level validation is not taken since the validation value is dynamic and it depends on each other.
           *
           * Field Validate will no take a dynamic validation value except it is being forced to be re-render.
           * in our case it will always validate with event n-1 validation value.
           * https://final-form.org/docs/react-final-form/types/FieldProps#validate
           */
          validate={validateSliderForm}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit, form: { mutators }, initialValues: values }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* SAVING SCREEN */}
              {isSaving && (
                <div className={styles.savingScreen}>
                  <Loader
                    className={styles.savingLoader}
                    text="Saving sliders"
                    textColour="white"
                  />
                </div>
              )}
              <div className={styles.content}>
                <div className={styles.table}>
                  <TableHeading />
                  {/* RENDER SLIDER ROWS */}
                  {Object.keys(values).map((slider) => (
                    <FieldPrefix key={slider} prefix={slider}>
                      <SliderRow
                        setValue={mutators.setValue}
                        sliderName={(values as any)[slider].sliderName}
                      />
                    </FieldPrefix>
                  ))}
                </div>
                {/* FOOTER */}
                <div className={styles.footer}>
                  <Button variant={EButtonVariant.PRIMARY} onClick={handleBack}>
                    Back
                  </Button>
                  <FormSpy
                    subscription={{
                      hasValidationErrors: true,
                      pristine: true,
                      submitting: true,
                    }}
                  >
                    {({ hasValidationErrors, submitting, pristine }) => (
                      <Button
                        disabled={
                          isSaving ||
                          submitting ||
                          hasValidationErrors ||
                          pristine
                        }
                        type="submit"
                        variant={EButtonVariant.SECONDARY}
                      >
                        Publish
                      </Button>
                    )}
                  </FormSpy>
                </div>
              </div>
            </form>
          )}
        </Form>
      )}
    </CalculatorLayout>
  );
};

export default SlidersData;
