import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Token } from './token';

@Injectable()
export class TokenService {

  constructor(
    private http: HttpClient
  ) { }

  getTokenData(domain: string, library: string, version: string) {
    return this.http.get(`${domain}/api/docs/${library}/${version}/ids-tokens/theme-default.raw.json`);
  }

  groupTokensByCategory(tokenData) {
    let grouped = {};
    let props: Array<Token> = tokenData.props;

    for (let key in props) {
      let curCategory = props[key].category;

      props[key].description = this.humanReadable(props[key].name);

      if (!grouped.hasOwnProperty(curCategory)) {
        grouped[curCategory] = new Array<Token>();
      }
      grouped[curCategory].push(props[key]);
    }
    return grouped;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private humanReadable(str: string) {
    return this.toTitleCase(this.dashesToSpaces(str));
  }

  private dashesToSpaces(str: string): string {
    return str.replace(/-/g, ' ')
  }

  private toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }}
