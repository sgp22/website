// Extra variables that live on Global that will be replaced by the Webpack DefinePlugin
declare var IS_PRODUCTION: string;
declare var DOMAIN: string;
declare var DOMAIN_VERSION: string;
declare var DOMAIN_DOCS_API: string;

interface GlobalEnvironment {
  IS_PRODUCTION;
  DOMAIN;
  DOMAIN_VERSION;
  DOMAIN_DOCS_API;
}
