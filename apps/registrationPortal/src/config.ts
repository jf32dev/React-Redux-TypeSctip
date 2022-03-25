interface Config {
  apiBase: string;
  hubLogin: string;
}
const envConfig: Config = {
  apiBase: process.env.REACT_APP_API_BASE || '',
  hubLogin: process.env.REACT_APP_HUB_LOGIN_URL || '',
};

export default envConfig;
