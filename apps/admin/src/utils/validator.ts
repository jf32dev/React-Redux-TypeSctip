export const composeValidation = <T = any>(
  ...validators: ((val: any) => string | undefined)[]
) => (value: T) =>
  validators.reduce(
    (error: string | undefined, validator) => error || validator(value),
    undefined
  );

export const positiveNumber = (val: number) =>
  val >= 0 ? undefined : 'Must be greater than 0';

export const lessThan = (max: number = 0) => (val: number) =>
  val <= max ? undefined : `Must be less than ${max}`;

export const greaterThan = (min: number = 0) => (val: number) =>
  val >= min ? undefined : `Must be greater than ${min}`;

export const between = (min: number = 0, max: number = 0) => (val: number) =>
  val >= min && val <= max ? undefined : `Must be in between ${min} and ${max}`;
