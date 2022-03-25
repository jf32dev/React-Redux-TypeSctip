import * as React from 'react';
import ColourPalette from './ColourPalette';

export default {
  title: 'Colour Palette',
  component: ColourPalette,
};

export const Default = () => {

  const [value, setValue] = React.useState('WHITE');

  return (
    <ColourPalette
      label="Image Background Colour"
      onChange={setValue}
      value={value}
    />
  );
};

export const CustomColours = () => {
  const colourSelection = ['red', 'blue', 'orange'];

  const [value, setValue] = React.useState('WHITE');

  return (
    <ColourPalette
      defaultColour="lightpink"
      colours={colourSelection}
      label="Image Background Colour"
      onChange={setValue}
      value={value}
    />
  );
};