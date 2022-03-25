export const slug = (text: string, replacement: string = '-') =>
  text.trim().replace(new RegExp(`[\\s${replacement}]+`, 'g'), replacement);

export const unslug = (text: string, slugSeparator: string = '-') =>
  text.replace(new RegExp(`[\\s${slugSeparator}]+`, 'g'), ' ');
