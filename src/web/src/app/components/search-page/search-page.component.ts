import { Component, AfterViewInit } from '@angular/core';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  providers: [SearchService]
})
export class SearchPageComponent implements AfterViewInit {
  public docsResults: any = [];
  public imagesResults: any = [];
  public pagesResults: any = [];
  public noResults = false;
  public relativeUrl;
  public library;
  public libVersion;

  constructor(
    private searchService: SearchService,
  ) { }

  ngAfterViewInit() {}

  onEnter(value: string) {
    if (value === '') {
      this.docsResults = [];
      this.imagesResults = [];
      this.pagesResults = [];
      return;
    }
    this.searchService.getSearch(value)
      .subscribe(
        res => {
          const { docs, pages } = res.results;
          docs ? this.docsResults = docs.hits : this.docsResults = [];
          this.pagesResults = pages;
          this.noResults = false;

          if (this.pagesResults) {
            this.pagesResults.map((page, i) => {
              if (page.meta) {
                this.pagesResults[i]['relativeUrl'] = page.meta.html_url.split('/').slice(3, -1).join('/');
              }
            });
          }

          if (this.docsResults) {

            this.docsResults.map((doc, i) => {
              const regexp = /docs\/|.json/gi;
              this.relativeUrl = doc.relativeUrl.replace(regexp, '');
              this.library = this.relativeUrl.split('/')[0];
              this.libVersion = this.relativeUrl.split('/')[1];
              this.docsResults[i]['relativeUrl'] = this.relativeUrl;
              this.docsResults[i]['library'] = this.library;
              this.docsResults[i]['libVersion'] = this.libVersion;
            });
          }

          if (this.docsResults.length === 0 && this.pagesResults.length === 0) {
            this.noResults = true;
          }
        },
        err => {
          console.error(err);
        }
      );
  }
}

