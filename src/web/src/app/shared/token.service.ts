import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Token } from './token';

@Injectable()
export class TokenService {
  private _dataStore: any = {};

  constructor(
    private http: HttpClient
  ) { }

  getTokenData(domain: string, library: string, version: string) {
    let url = `${domain}/api/docs/${library}/${version}/ids-tokens/theme-default.raw.json`;

    if (this._dataStore.hasOwnProperty(url)) {
      console.log(`service store '${url}'`);
      return Observable.of(this._dataStore[url]);

    } else {
      return this.http
        .get(url)
        .pipe(tap(res => {
          console.log(`http '${url}'`);
          this.store(url, res);
        }))
        .catch((err: Response) => {
          if (err.status === 400) {
            console.log('Err: No tokens found for this version.');
            return JSON.stringify([]);
          } else {
            return Observable.throw(new Error(`${ err.status } ${ err.statusText }`));
          }
        })
        .first();
    }
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
  }

  private store(key: string, data: any) {
    this._dataStore[key] = data;
  }
}
