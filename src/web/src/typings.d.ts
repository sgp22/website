// Extra variables that live on Global that will be replaced by the Webpack DefinePlugin
declare var IS_PRODUCTION: string;
declare var DOMAIN: string;
declare var DOMAIN_DOCS_API: string;
declare var DOMAIN_VERSION: string;
declare var ROOT_URL_PATH: string;

interface GlobalEnvironment {
  IS_PRODUCTION;
  DOMAIN;
  DOMAIN_DOCS_API;
  DOMAIN_VERSION;
  ROOT_URL_PATH;
}
