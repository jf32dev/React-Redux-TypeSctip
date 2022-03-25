import * as React from 'react';
import cx from 'classnames';
import { withTypes } from 'react-final-form';
import { Mutator } from 'final-form';

import { EButtonVariant, Button, ProgressBar } from '@redbull/components';

import { useTranslation } from 'react-i18next';
import { ECalculatorType } from '../shared/config';
import Heading from './WizardHeading';
import Page from './WizardPage';
import SaveButton from './WizardSaveButton';

import styles from '../Calculator.module.scss';

type Props<T> = {
  calculator: ECalculatorType;
  initialValues?: T;
  steps: { label: string; id: number }[];
  onSubmit?: (vals: any) => void;
};

const Wizard = <T extends {} = any>({
  children,
  initialValues,
  onSubmit,
  steps,
  calculator,
}: React.PropsWithChildren<Props<T>>) => {
  const { t } = useTranslation();
  const [isInitiated, setIsInitiated] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [formValues, setFormValues] = React.useState({});

  const resetForm = () => {
    setIsInitiated(false);
    setPage(0);
  };

  const next = (vals: any) => {
    if (children) {
      setPage((state) =>
        Math.min(state + 1, React.Children.toArray(children).length - 1)
      );
      setFormValues(vals);
    }
  };

  const previous = () => {
    setPage((state) => Math.max(state - 1, 0));
  };

  const validate = (vals: any) => {
    const activePage: any = React.Children.toArray(children)[page];
    return activePage.props.validate ? activePage.props.validate(vals) : {};
  };

  const handleFormSubmit = (vals: any) => {
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit ? onSubmit(vals) : () => {};
    }
    return next(vals);
  };

  const pages = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const { displayName } = (child as React.ReactElement).type as any;
      if (displayName === 'FormPage') {
        return child;
      }
    }
    return null;
  });

  const activePage: any = pages && pages[page];
  const isLastPage = page === (pages && pages.length - 1);

  const headingArr: any = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const { displayName } = (child as React.ReactElement).type as any;
      if (displayName === 'FormHeading') {
        return child;
      }
    }
    return null;
  });

  const heading: any = headingArr && headingArr[0];

  const saveBtnArr: any = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const { displayName } = (child as React.ReactElement).type as any;
      if (displayName === 'FormSaveButton') {
        return child;
      }
    }
    return null;
  });

  const saveBtn: any = saveBtnArr && saveBtnArr[0];

  React.useEffect(() => {
    if (initialValues && !isInitiated) {
      initialValues && setFormValues(initialValues);
      setIsInitiated(true);
    }
  }, [initialValues, isInitiated]);

  const setValue: Mutator<T> = ([field, value], state, { changeValue }) => {
    changeValue(state, field, () => value);
  };

  const { Form } = withTypes<T>();
  return (
    <Form
      initialValues={formValues}
      mutators={{
        setValue,
      }}
      validate={validate}
      onSubmit={handleFormSubmit}
    >
      {({
        handleSubmit,
        form: { mutators },
        hasValidationErrors,
        submitting,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          {/* HEADING */}
          {heading && (
            <heading.type
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...heading.props}
              activePage={page}
              resetForm={resetForm}
              setValue={mutators.setValue}
              values={values}
            />
          )}
          {/* PROGRESS BAR */}
          <div className={styles.row}>
            <div className={styles.col}>
              <ProgressBar
                activeStepId={page}
                className={styles.steps}
                steps={steps}
              />
            </div>
          </div>
          {/* PAGES */}
          <activePage.type
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...activePage.props}
            setValue={mutators.setValue}
            values={values}
          />
          {/* NAVIGATION */}
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={cx(styles.buttons, page > 0 && styles.multiple)}>
                {page > 0 && (
                  <Button type="button" onClick={previous}>
                    {t('navigation.back')}
                  </Button>
                )}
                {!isLastPage && (
                  <Button
                    disabled={submitting || hasValidationErrors}
                    type="submit"
                    variant={EButtonVariant.PRIMARY}
                  >
                    {t('navigation.next')}
                  </Button>
                )}
                {isLastPage && saveBtn && (
                  <saveBtn.type
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...saveBtn.props}
                    calculator={calculator}
                    values={values}
                  />
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </Form>
  );
};

Wizard.Page = Page;
Wizard.Heading = Heading;
Wizard.PdfToRender = SaveButton;

export default Wizard;
