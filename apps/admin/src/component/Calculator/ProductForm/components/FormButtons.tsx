import * as React from 'react';
import { Button, EButtonVariant } from '@redbull/components';
import { FormSpy } from 'react-final-form';
import { useHistory } from 'react-router';

import { capitalize } from 'lodash';
import styles from '../ProductForm.module.scss';

type Props = {
  action: 'add' | 'edit';
  isSaving: boolean;
};

const FormButtons = ({ action, isSaving }: Props) => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };
  return (
    <FormSpy
      subscription={{
        pristine: true,
        submitting: true,
        hasValidationErrors: true,
      }}
    >
      {({ pristine, submitting, hasValidationErrors }: any) => {
        return (
          <div className={styles.footer}>
            <Button variant={EButtonVariant.SECONDARY} onClick={handleBack}>
              Back
            </Button>
            <Button
              disabled={
                pristine || submitting || hasValidationErrors || isSaving
              }
              type="submit"
              variant={EButtonVariant.PRIMARY}
            >
              {capitalize(action)}
            </Button>
          </div>
        );
      }}
    </FormSpy>
  );
};

export default FormButtons;
