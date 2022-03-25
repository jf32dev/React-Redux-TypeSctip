import * as React from 'react';
import { uniqueId } from 'lodash';
import { useNumberParser } from '@redbull/common';
import Input from '../Input';

import styles from './Range.module.scss';

type Props = {
  allowDecimal?: boolean;
  currencySymbol?: string;
  error?: boolean;
  errorMessage?: string;
  label: string;
  isCurrency?: boolean;
  isPercentage?: boolean;
  max?: number;
  min?: number;
  name: string;
  eurLocale: string | undefined;
};

const Range = ({
  allowDecimal = true,
  currencySymbol,
  error,
  errorMessage,
  eurLocale,
  isCurrency,
  isPercentage,
  label,
  max = 10,
  min = 0,
  name,
  ...props
}: Props) => {
  const [id] = React.useState(uniqueId('range_'));
  const [formatStringNumber, , toNumber] = useNumberParser(eurLocale);
  // Strip the currency / percentage symbol before
  // passing the value to the onChange method
  // This prevents error for manual input
  const handleChange = (e: any, onChange: any) => {
    let val = e.target.value as string;
    if (isCurrency) val = val.slice(1);
    if (isPercentage) {
      if (!val.includes('%')) val = val.slice(0, -1);
      val = val.replace('%', '');
    }
    if (allowDecimal) {
      onChange(val);
    } else {
      onChange(toNumber(val).toFixed(0));
    }
  };

  const localeValue = formatStringNumber((props as any).value);

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <label htmlFor={id}>{label}</label>
        <Input
          containerClassName={styles.field}
          error={error}
          errorMessage={errorMessage}
          id={id}
          name={name}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          value={
            // TODO: this can be better using the INTL Formatter
            // eslint-disable-next-line no-nested-ternary
            isCurrency
              ? `${currencySymbol}${localeValue}`
              : isPercentage
              ? `${localeValue}%`
              : localeValue
          }
          onChange={(e) => handleChange(e, (props as any).onChange)}
        />
      </div>
      <div className={styles.range}>
        <input
          max={max}
          min={min}
          name={name}
          type="range"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          value={toNumber(localeValue)}
        />
      </div>
    </div>
  );
};

export default Range;
