interface Config {
  [key: string]: Record<string, string>;
  navigation: Record<string, string>;
  calculator: Record<string, string>;
  calculatorReplacement: Record<string, string>;
  thumbnail: Record<string, string>;
  translations: Record<string, string>;
  ucs: {
    baseUrl: string;
    baseUrn: string;
    dashboard: string;
  };
}

const envConfig: Config = {
  navigation: {
    Learn: process.env.REACT_APP_LEARN_TAB || '0',
    'Sell & Execute': process.env.REACT_APP_SELL_TAB || '0',
  },
  calculator: {
    tab: process.env.REACT_APP_CALCULATOR_TAB || '0',
    app: process.env.REACT_APP_CALCULATOR_APP || '0',
  },
  calculatorReplacement: {
    tab: process.env.REACT_APP_CALCULATOR_REPLACEMENT_TAB || '0',
  },
  thumbnail: {
    library: process.env.REACT_APP_THUMBNAIL_LIBRARY || '0',
  },
  translations: {
    story: process.env.REACT_APP_TRANSLATIONS_STORY || '0',
  },
  ucs: {
    baseUrl: process.env.REACT_APP_UCS_BASE_URL || '',
    baseUrn: process.env.REACT_APP_UCS_BASE_URN || '',
    dashboard: process.env.REACT_APP_UCS_DASHBOARD_ID || '',
  },
};

export const enabledPages = ['Learn', 'Sell & Execute'];

export default envConfig;
