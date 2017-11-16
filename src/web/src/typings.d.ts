// Extra variables that live on Global that will be replaced by the Webpack DefinePlugin
declare var ENV: string;
declare var API_SERVER: string;
declare var API_SERVER_PROD: string;
declare var API_SERVER_VERSION: string;

interface GlobalEnvironment {
  ENV;
  API_SERVER;
  API_SERVER_PROD;
  API_SERVER_VERSION;
}
