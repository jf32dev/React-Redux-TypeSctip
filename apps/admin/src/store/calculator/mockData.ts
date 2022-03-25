// NOTE: keeping the data here in case we ever write test for this, they will come in handy

export const calculatorListData = {
  isSuccess: true,
  data: [
    {
      id: '0ecf3340-3790-43bb-a780-9c2223ca797c',
      country: 'Italy',
      name: 'Trade Up',
      countryCode: 'IT',
    },
    {
      id: '96345f8b-010f-421f-a047-58045903000f',
      country: 'Italy',
      name: 'Uplift Distribution',
      countryCode: 'IT',
    },
    {
      id: '9cd12413-cda0-419c-80e0-17a58c017299',
      country: 'Italy',
      name: 'Uplift Sales Driver',
      countryCode: 'IT',
    },
  ],
  message: null,
  total: 3,
};

export const calculatorSliderData = {
  isSuccess: true,
  data: [
    {
      id: '0ecf3340-3790-43bb-a780-9c2223ca111a',
      sliderName: 'Current Weekly Sales',
      min: 0,
      max: 10000,
      defaultValue: 0,
      unit: 'Currency',
      calculatorId: '0ecf3340-3790-43bb-a780-9c2223ca797c',
    },
    {
      id: '0ecf3340-3790-43bb-a780-9c2223ca112a',
      sliderName: 'Est. Uplift %',
      min: 0,
      max: 0,
      defaultValue: 0,
      unit: 'Percentage',
      calculatorId: '0ecf3340-3790-43bb-a780-9c2223ca797c',
    },
    {
      id: '0ecf3340-3790-43bb-a780-9c2223ca113a',
      sliderName: 'Customer Selling Price',
      min: 0,
      max: 0,
      defaultValue: 0,
      unit: 'Currency',
      calculatorId: '0ecf3340-3790-43bb-a780-9c2223ca797c',
    },
    {
      id: '0ecf3340-3790-43bb-a780-9c2223ca114a',
      sliderName: 'Case Deal',
      min: 0,
      max: 0,
      defaultValue: 0,
      unit: 'Currency',
      calculatorId: '0ecf3340-3790-43bb-a780-9c2223ca797c',
    },
  ],
  message: 'string',
  total: 0,
};

export const calculatorProductData = {
  isSuccess: true,
  data: [
    {
      id: '0ecf3340-3790-43bb-a780-9c2223ca767h',
      currency: 'EUR',
      type: 'Retail',
      variant: 'Energy',
      size: '250ml',
      pack: 'Single',
      unitsPerCase: 1.99,
      taxes: 1.99,
      image: '',
    },
    {
      id: '0ecf3340-3790-43bb-a780-9c2223ca457h',
      currency: 'EUR',
      type: 'Retail',
      variant: 'Energy',
      size: '250ml',
      pack: 'Single',
      unitsPerCase: 1.99,
      taxes: 1.99,
      image: '',
    },
    {
      id: '0ecf3340-3790-43bb-a780-9c2223ca127h',
      currency: 'EUR',
      type: 'Retail',
      variant: 'Energy',
      size: '250ml',
      pack: 'Single',
      unitsPerCase: 1.99,
      taxes: 1.99,
      image: '',
    },
  ],
  message: null,
  total: 3,
};

export const selectedProductData = {
  isSuccess: true,
  data: {
    id: '0ecf3340-3790-43bb-a780-9c2223ca767h',
    currency: 'EUR',
    type: 'Retail',
    variant: 'Energy',
    size: '250ml',
    pack: 'Single',
    unitsPerCase: 1.99,
    taxes: 1.99,
    image: '',
  },
  message: null,
  total: 1,
};
