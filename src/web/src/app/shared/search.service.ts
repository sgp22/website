import { AppSettings } from '../app.settings';
import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LibraryService } from './library.service';
import * as semver from 'semver';


@Injectable()
export class SearchService {
  public docsResults;
  public imagesResults;
  public pagesResults;
  public allVersions;
  public latestEp;
  public latestCSS;
  public latestPendo;

  constructor(
    private appSettings: AppSettings,
    private cacheService: CacheService,
    private http: HttpClient,
    private libraryService: LibraryService
  ) { }

  getLatestVersion() {
    const libraries = ['ids-enterprise', 'ids-css', 'ids-pendo'];
    // libraries.forEach(library => {
      this.libraryService.getAllLibraryVersionPaths(libraries[0])
        .subscribe(res => {

          this.latestEp = res['files']
            .filter(file => {
              const lib = file.split('/')[1];
              return lib === libraries[0];
            })
            .reduce((prev, curr) => {
              const prevV = prev.split('/')[2];
              const currV = curr.split('/')[2];
              return prevV > currV ? prevV : currV;
            });

          return this.latestEp;

          // const css = res['files']
          //   .filter(file => {
          //     const lib = file.split('/')[1];
          //     return lib === libraries[1];
          //   });

          // const pendo = res['files']
          //   .filter(file => {
          //     const lib = file.split('/')[1];
          //     return lib === libraries[2];
          //   });

          // this.versionPaths = res['files']
          //   .map(file => {
          //     const versions = {};
          //     versions['full'] = file.replace(/docs/, '');
          //     versions['label'] = file.split('/').slice(-2, -1).join('');
          //     return versions;
          //   })
          //   .sort((a, b) => {
          //     return semver.compare(a.label, b.label);
          //   })
          //   .reverse();

          // this.versionPaths.unshift({
          //   full: `/${this.library}/latest/`,
          //   label: `Latest (${this.versionPaths[0]['label']})`
          // });

          // latestVersion = this.versionPaths[1]['label'];
          // this.path = urlSegment.join('/');
          // this.currentVersion = urlSegment[2];
          // this.mapPath = this.urlMapper.map(this.urlParser.parse(this.path));
          // this.versionShowWarning(this.currentVersion, latestVersion);

          // if (this.currentVersion === 'latest') {
          //   this.selectedVersionNumber = latestVersion;
          // } else {
          //   this.selectedVersionNumber = this.currentVersion;
          // }
        })
    // })
  }

  getSearch(query: string) {
    this.getLatestVersion();
    console.log(this.latestEp);
    const url = `${this.appSettings.domain}/search/es/?search_query=${query}&libraries=ids-enterprise:4.10.0,ids-css:1.3.0,ids-pendo:1.0.0`;
    return this.cacheService.get(url, this.http.get(url).first());
  }
}
