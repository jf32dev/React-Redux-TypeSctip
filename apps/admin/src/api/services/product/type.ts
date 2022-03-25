// UPLIFT DISTRIBUTION
export interface UpliftDistributionBase {
  [key: string]: string | number;
  backgroundColor: string;
  currency: string;
  image: string;
  pack: string;
  size: string;
  taxes: number;
  type: string;
  unitPerCase: number;
  variant: string;
}

export interface UpliftDistribution extends UpliftDistributionBase {
  calculatorId: string;
  country: string;
  currencyValue: string;
  fileId: string;
  id: string;
  imageHub: string;
  imageServer: string;
  packValue: string;
  sizeValue: string;
  typeValue: string;
  variantValue: string;
}

// UPLIFT SALES DRIVER
export interface UpliftSalesDriverBase {
  [key: string]: string | number;
  backgroundColor: string;
  currency: string;
  image: string;
  salesDriver: string;
  taxes: number;
  type: string;
  unitPerCase: number;
}

export interface UpliftSalesDriver extends UpliftSalesDriverBase {
  calculatorId: string;
  country: string;
  currencyValue: string;
  fileId: string;
  id: string;
  imageHub: string;
  imageServer: string;
  salesDriverValue: string;
  taxes: number;
  typeValue: string;
  unitPerCase: number;
}

// TRADE UP
export interface TradeUpBase {
  [key: string]: string | number;
  backgroundColor: string;
  currency: string;
  multiplier355: number;
  multiplier473: number;
  type: string;
}
export interface TradeUp extends TradeUpBase {
  calculatorId: string;
  country: string;
  currencyValue: string;
  id: string;
  typeValue: string;
}

// COMBINED TYPES
export type ProductBase =
  | UpliftDistributionBase
  | UpliftSalesDriverBase
  | TradeUpBase;

export type Product = UpliftDistribution | UpliftSalesDriver | TradeUp;
