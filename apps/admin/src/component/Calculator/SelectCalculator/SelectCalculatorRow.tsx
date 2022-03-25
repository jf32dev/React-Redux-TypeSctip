import { Button, EButtonVariant } from '@redbull/components';
import { kebabCase } from 'lodash';
import * as React from 'react';
import { CalculatorData } from '../../../api/services/calculator/type';
import styles from './SelectCalculator.module.scss';

type Props = {
  calculator: CalculatorData;
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const SelectCalculatorRow = ({ calculator, icon, onClick }: Props) => {
  return (
    <div
      key={calculator.id}
      className={styles['calculator-row']}
      id={calculator.id}
    >
      <div className={styles['title-wrapper']}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.title}>
          {calculator.countryCode} - {calculator.name}
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          data-calcid={calculator.id}
          data-calctype={kebabCase(calculator.name)}
          data-country={calculator.countryCode}
          data-datatype="data"
          variant={EButtonVariant.PRIMARY}
          onClick={onClick}
        >
          Data
        </Button>
        <Button
          data-calcid={calculator.id}
          data-calctype={kebabCase(calculator.name)}
          data-country={calculator.countryCode}
          data-datatype="slider"
          variant={EButtonVariant.SECONDARY}
          onClick={onClick}
        >
          Slider
        </Button>
      </div>
    </div>
  );
};

export default SelectCalculatorRow;
