import { Injectable } from '@angular/core';

@Injectable()
export class AppSettings {
  /**
   * The domain docs api url
   * @returns {string}
   */
  get domainDocsApi(): string { return DOMAIN_DOCS_API; }

  /**
   * The domain
   * @returns {string}
   */
  get domain(): string { return DOMAIN; }

  /**
   * The domain version
   * @returns {string}
   */
  get domainVersion(): string { return DOMAIN_VERSION; }

  /**
   * Whether its production
   * @returns {boolean}
   */
  get isProduction(): boolean { return IS_PRODUCTION === 'true'; }
}
