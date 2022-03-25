import React from 'react';

export const createCalculatorContext = <T>(initialValue: T) =>
  React.createContext<T>(initialValue);

export const combineCalculatorReducers = (
  reducers: Record<string, (state: any, action: any) => any>
) => {
  return (state: any, action: any) =>
    Object.keys(reducers).reduce(
      (acc, next) => ({
        ...acc,
        [next]: reducers[next](acc[next], action),
      }),
      state
    );
};
