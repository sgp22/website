import { Component, AfterViewInit } from '@angular/core';
import { SearchService } from '../../shared/search.service';
import { AppSettings } from '../../app.settings';
import { CacheService } from '../../shared/cache.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  providers: [SearchService]
})
export class SearchPageComponent implements AfterViewInit {
  public docsResults: any = [];
  public imagesResults: any = [];
  public pagesResults: any = [];

  constructor(
    private appSettings: AppSettings,
    private searchService: SearchService,
    private http: HttpClient,
    private cacheService: CacheService
  ) { }

  ngAfterViewInit() {}

  onEnter(value: string) {
    this.searchService.getSearch(value)
      .subscribe(
        res => {
          const { docs, images, pages } = res.results;
          this.docsResults = docs.results.results;
          this.imagesResults = images.results;
          pages.results.map(result => {
            const url = `${this.appSettings.domain}/api/${this.appSettings.domainVersion}/pages/${result.pk}`;
            this.cacheService.get(url, this.http.get(url).first()).subscribe(res => {
              this.pagesResults.push(res);
            });
          });
        },
        err => {
          console.error(err);
        },
        () => {
          console.log('done');
        }
      )
  }
}

