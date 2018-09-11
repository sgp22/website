import { Component, ViewChild, OnInit } from '@angular/core';
import { SearchService } from '../../shared/search.service';
import { Router, ActivatedRoute  } from "@angular/router";
import { NgForm } from '@angular/forms';
import { AppSettings } from '../../app.settings';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  providers: [SearchService]
})
export class SearchPageComponent implements OnInit {
  public docsResults: any = [];
  public imagesResults: any = [];
  public pagesResults: any = [];
  public noResults = false;
  public relativeUrl;
  public library;
  public libVersion;
  public domain = '';
  public query = '';
  @ViewChild('searchForm') searchForm: NgForm;

  constructor(
    private searchService: SearchService,
    private appSettings: AppSettings,
    private loadingBar: LoadingBarService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.domain = this.appSettings.domain;
    this.route.queryParams.subscribe(params => {
      this.search(params.q) });
  }

  handleQuery(searchForm) {
    this.router.navigate(['site/search'], { queryParams: { q: `${searchForm.query.trim()}` } });
  }

  search(term) {
    if (term === '' || term === undefined) {
      this.docsResults = [];
      this.imagesResults = [];
      this.pagesResults = [];
      return;
    }
    this.loadingBar.start();
    this.searchService.getSearch(term)
      .subscribe(
        res => {
          console.log(res);
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
        },
        () => {
          this.loadingBar.complete();
        },
      );
  }

}
