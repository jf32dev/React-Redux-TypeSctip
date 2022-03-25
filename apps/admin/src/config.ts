interface Config {
  [key: string]: any;
  apiBase: string;
}
const envConfig: Config = {
  apiBase: process.env.REACT_APP_API_BASE || '',
};

export default envConfig;
