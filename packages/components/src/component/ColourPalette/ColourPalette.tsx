import * as React from 'react';
import cx from 'classnames';
import { uniqueId } from 'lodash';

import { DEFAULT_COLOUR } from './config/defaults';
import { isColourValid, getThemeByColour } from './config/utils';
import { brandColours } from './config/brandColours';

import Input from '../Input';
import ColourSwatch from './components/ColourSwatch';
import SelectedColour from './components/SelectedColour';
import ErrorMessage from './components/ErrorMessage';

import styles from './ColourPalette.module.scss';

type Props = {
  colours?: string[];
  className?: string;
  defaultColour?: string;
  id?: string;
  label?: string;
  onChange: (colour: string) => void;
  error?: string;
  value: string;
};

const ColourPalette = ({
  colours = brandColours,
  className,
  defaultColour = DEFAULT_COLOUR,
  error,
  id,
  label,
  onChange,
  value,
}: Props) => {
  const [autoId] = React.useState(uniqueId('palette_'));

  const [selectedColour, setSelectedColour] = React.useState<string>(
    defaultColour
  );
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');
  const [colourInput, setColourInput] = React.useState<string>(defaultColour);
  const [colourInputInvalid, setColourInputInvalid] = React.useState<boolean>(
    false
  );

  const handleColourClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLDivElement;
    const { colour } = target.dataset;
    if (colour) {
      setColour(colour);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colour = e.target.value;
    setColourInput(colour);
    validateColour(colour);
  };

  const handleReset = () => {
    setColour(defaultColour);
  };

  const setColour = React.useCallback(
    (colour: string) => {
      if (colour) {
        const themeColour = getThemeByColour(colour);
        setColourInput(colour);
        setSelectedColour(colour);
        setColourInputInvalid(false);
        themeColour && setTheme(themeColour);
        onChange(colour);
      }
    },
    [onChange]
  );

  const validateColour = React.useCallback(
    (colour: string) => {
      if (isColourValid(colour)) {
        setColour(colour);
      } else {
        setColourInputInvalid(true);
      }
    },
    [setColour]
  );

  React.useEffect(() => {
    if (value !== selectedColour) {
      validateColour(value);
    }
  }, [selectedColour, validateColour, value]);

  return (
    <div className={cx(styles.container, className)}>
      <label className={styles.label} htmlFor={id || autoId}>
        {label}
      </label>
      <div className={styles.palette}>
        <SelectedColour colour={selectedColour} theme={theme} />
        <div className={styles.selection}>
          {colours.map((c: string) => (
            <ColourSwatch key={c} colour={c} onClick={handleColourClick} />
          ))}
        </div>
        <div className={styles.input}>
          <Input
            className={styles.field}
            error={colourInputInvalid}
            id={id || autoId}
            value={colourInput}
            resetActive
            onChange={handleInputChange}
            onResetClick={handleReset}
          />
        </div>
      </div>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default ColourPalette;
