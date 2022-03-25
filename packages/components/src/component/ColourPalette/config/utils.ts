import { colourNames } from './colourNames';

/**
 * Valid hex code starts with '#'
 * is followed by a-f, A-F and/or digits 0-9
 * is 3 or 6 characters long
 * @param colour hex format or valid html name
 */
export const isColourValid = (colour: string): boolean => {
  const regex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
  return (
    regex.test(colour) ||
    !!colourNames[colour.toLowerCase() as keyof typeof colourNames]
  );
};

/**
 * Get theme (light or dark) for text over selected colour
 * If colour is dark, theme will be light and vice versa
 * @param colour hex format or valid html name
 */
export type TColourTheme = 'light' | 'dark';

export const getThemeByColour = (colour: string): TColourTheme | null => {
  if (!colour) {
    return null;
  }

  let hex = '';
  // if colour is in hex format already
  if (colour.indexOf('#') === 0) {
    hex = colour.slice(1);
  } else {
    // if it's html name find it's hex code
    hex = colourNames[colour.toLowerCase() as keyof typeof colourNames].slice(
      1
    );
  }

  // convert 3 hex to 6 hex
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // convert hex to rgb
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'dark' : 'light';
};
