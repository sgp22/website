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

