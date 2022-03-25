import * as React from 'react';
import { uniqueId } from 'lodash';
import cx from 'classnames';
import styles from './TextArea.module.scss';

type TTextAreaProps = {
  containerClassName?: string;
  error?: boolean;
  label?: string;
  message?: string;
  resizable?: boolean;
} & React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;
const TextArea = ({
  containerClassName,
  disabled,
  error,
  label,
  message,
  readOnly,
  required,
  resizable,
  ...props
}: TTextAreaProps) => {
  const [id] = React.useState(uniqueId('textarea_'));

  return (
    <div className={cx(styles.textarea, containerClassName)}>
      {label && (
        <label className={cx(required && styles.required)} htmlFor={id}>
          {label}
        </label>
      )}
      <div
        className={cx(
          styles.customtextarea,
          (disabled || readOnly) && styles.disabled,
          resizable && styles.resizable,
          error && styles.error
        )}
        id={id}
      >
        <textarea
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      </div>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default TextArea;
