const envConfig = {
  apiBase: process.env.REACT_APP_API_BASE || 'https://redbull.gs.bigtincan.org',
  calculatorTabId: Number(process.env.REACT_APP_CALCULATOR_TAB_ID) || 21251,
  calculatorAppStoryId:
    Number(process.env.REACT_APP_CALCULATOR_APP_STORY_ID) || 12025739,
};

export default envConfig;
