import * as React from 'react';
import { withTypes } from 'react-final-form';
import { useHistory } from 'react-router';

import { Loader, NoDataError, useFlyin } from '@redbull/components';

import useCreateApplication from '../../hooks/useCreateApplication';
import useGetFieldData from '../../hooks/useGetFieldData';
import { FieldInput, FieldSelect } from './components';
import { mapFormStateToDataObject, validateEmail, setValue } from './utils';
import { IRegistrationForm } from './type';

import styles from './RegistrationForm.module.scss';
import Region from './Region';
import FooterButtons from './FooterButtons';
import Country from './Country';

const RegistrationForm = () => {
  const history = useHistory();
  const { Form } = withTypes<IRegistrationForm>();
  const { addFlyin } = useFlyin();

  const {
    createApplication,
    status: createApplicationStatus,
    error: createApplicationError,
  } = useCreateApplication();

  const {
    status: fieldsStatus,
    data: fieldsOptions,
    error: fieldsError,
  } = useGetFieldData();

  const handleFormSubmit = (values: IRegistrationForm) => {
    const dataObject = mapFormStateToDataObject(values);
    createApplication(dataObject);
  };

  React.useEffect(() => {
    if (createApplicationStatus === 'failed') {
      addFlyin(
        createApplicationError ||
          'There was an error submitting your application.',
        { type: 'danger', id: 'create-app-error' }
      );
    } else if (createApplicationStatus === 'succeeded') {
      history.push('/thank-you');
    }
  }, [addFlyin, createApplicationError, createApplicationStatus, history]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Form
          mutators={{
            setValue,
          }}
          // NOTE: subscription prevents the full form rerendering
          // instead only each field rerenders individually
          subscription={{}}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit, form: { mutators } }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.header}>
                <h1>REGISTRATION FORM</h1>
              </div>
              {fieldsStatus === 'loading' && (
                <Loader className={styles.loader} />
              )}
              {fieldsStatus === 'failed' && (
                <NoDataError title="Error loading form">
                  There was an error loading the Registration Form.
                  <br />
                  {fieldsError && (
                    <>
                      {fieldsError}
                      <br />
                    </>
                  )}
                  Please refresh page to try again.
                </NoDataError>
              )}
              {fieldsStatus === 'succeeded' && fieldsOptions && (
                <div className={styles.content}>
                  <div className={styles.personal}>
                    <h2>PERSONAL INFORMATION</h2>
                    <div className={styles.row}>
                      <FieldInput
                        errorMessage="Please enter First Name"
                        label="First Name"
                        name="firstName"
                        setValue={mutators.setValue}
                      />
                    </div>
                    <div className={styles.row}>
                      <FieldInput
                        errorMessage="Please enter Last Name"
                        label="Last Name"
                        name="lastName"
                        setValue={mutators.setValue}
                      />
                    </div>
                    <div className={styles.row}>
                      <FieldInput
                        errorMessage="Please enter Email Address"
                        invalidMessage="Please enter a valid Email Address"
                        label="Email Address"
                        name="email"
                        setValue={mutators.setValue}
                        type="email"
                        validation={validateEmail}
                      />
                    </div>
                  </div>
                  <div className={styles.account}>
                    <h2>ACCOUNT INFORMATION</h2>
                    <div className={styles.row}>
                      <Country
                        options={fieldsOptions.country}
                        setValue={mutators.setValue}
                      />
                    </div>
                    <div className={styles.row}>
                      <Region />
                    </div>
                    <div className={styles.row}>
                      <FieldSelect
                        errorMessage="Please enter Default Language"
                        label="Default Language"
                        name="language"
                        options={fieldsOptions.language}
                        searchable={fieldsOptions.language.length > 5}
                        required
                      />
                    </div>
                    <div className={styles.row}>
                      <FieldInput
                        errorMessage="Please enter Distribution Partner or Agency"
                        label="Distribution Partner or Agency"
                        name="partner"
                        setValue={mutators.setValue}
                      />
                    </div>
                  </div>
                </div>
              )}

              <FooterButtons error={!!fieldsError} />
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};

export default RegistrationForm;
