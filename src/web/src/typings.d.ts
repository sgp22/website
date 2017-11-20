// Extra variables that live on Global that will be replaced by the Webpack DefinePlugin
declare var ENV: string;
declare var DOMAIN: string;
declare var DOMAIN_PROD: string;
declare var DOMAIN_VERSION: string;

interface GlobalEnvironment {
  ENV;
  DOMAIN;
  DOMAIN_PROD;
  DOMAIN_VERSION;
}
