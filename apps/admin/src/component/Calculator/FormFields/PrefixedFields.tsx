import * as React from 'react';

type TFieldPrefixContext = { prefix: string };

const FieldPrefixContext = React.createContext<TFieldPrefixContext>({
  prefix: '',
});

export const FieldPrefix = ({
  prefix,
  children,
}: React.PropsWithChildren<TFieldPrefixContext>) => (
  <FieldPrefixContext.Provider value={{ prefix }}>
    {children}
  </FieldPrefixContext.Provider>
);

export const PrefixedField = ({
  name,
  children,
}: React.PropsWithChildren<{ name: string }>) => (
  <FieldPrefixContext.Consumer>
    {({ prefix }: TFieldPrefixContext) =>
      typeof children === 'function' && children({ name: `${prefix}.${name}` })
    }
  </FieldPrefixContext.Consumer>
);
