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
          const { docs, images, pages } = res.results;
          this.docsResults = docs.results.results;
          this.imagesResults = images.results;
          this.pagesResults = pages.results;
          this.noResults = false;
          if (this.pagesResults) {
            this.pagesResults.map((page, i) => {
              this.pagesResults[i]['relativeUrl'] = page.meta.html_url.split('/').slice(3, -1).join('/');
            });
          }

          console.log(res);

          if (
            this.docsResults === undefined &&
            this.imagesResults.length === 0 &&
            this.pagesResults.length === 0
          ) {
            this.noResults = true;
          }
        },
        err => {
          console.error(err);
        },
        () => {
          console.log('done');
        }
      );
  }
}

