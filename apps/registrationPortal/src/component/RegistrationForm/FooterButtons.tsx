import * as React from 'react';
import { FormSpy } from 'react-final-form';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { Button, EButtonVariant } from '@redbull/components';
import buttonStyle from '@redbull/components/src/component/Button/Button.module.scss';
import styles from './RegistrationForm.module.scss';

type Props = {
  error: boolean;
};

const FooterButtons = ({ error }: Props) => {
  return (
    <div className={styles.footer}>
      <Link
        className={cx(
          buttonStyle.button,
          buttonStyle[EButtonVariant.PRIMARY],
          styles.button
        )}
        role="button"
        to="/"
      >
        Cancel
      </Link>
      <FormSpy
        subscription={{
          submitting: true,
          hasValidationErrors: true,
        }}
      >
        {({ submitting, hasValidationErrors }: any) => {
          return (
            <Button
              className={styles.button}
              disabled={submitting || hasValidationErrors || error}
              type="submit"
              variant={EButtonVariant.PRIMARY}
            >
              Submit
            </Button>
          );
        }}
      </FormSpy>
    </div>
  );
};

export default FooterButtons;
