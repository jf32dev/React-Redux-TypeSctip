import React from 'react';
import cx from 'classnames';
import { CountryCode } from '@redbull/common';

type TProps = {
  code: CountryCode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};
const CountryFlag = ({ code = 'DE', size, className }: TProps) => {
  if (!size) {
    return <div className={cx(`fp ${code.toLowerCase()}`, className)} />;
  }
  return (
    <div className={cx(`fp fp-${size} ${code.toLowerCase()}`, className)} />
  );
};

export default CountryFlag;
