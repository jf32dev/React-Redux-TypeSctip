interface Config {
  [key: string]: Record<string, string>;
  navigation: Record<string, string>;
  calculator: Record<string, string>;
  calculatorReplacement: Record<string, string>;
  thumbnail: Record<string, string>;
  translations: Record<string, string>;
}

const envConfig: Config = {
  navigation: {
    account: process.env.REACT_APP_ACCOUNT_TAB || '0',
    execute: process.env.REACT_APP_EXECUTE_TAB || '0',
    learn: process.env.REACT_APP_LEARN_TAB || '0',
    sell: process.env.REACT_APP_SELL_TAB || '0',
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
};

export const enabledPages = ['learn', 'sell', 'execute'];

export default envConfig;
