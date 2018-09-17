import { Component, ViewChild, OnInit } from '@angular/core';
import { SearchService } from '../../shared/search.service';
import { Router, ActivatedRoute  } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AppSettings } from '../../app.settings';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  providers: [SearchService]
})
export class SearchPageComponent implements OnInit {
  public searchResults = [];
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
    this.route.queryParams.subscribe(params => this.search(params.q));
  }

  handleQuery(searchForm) {
    this.router.navigate(['site/search'], { queryParams: { q: `${searchForm.query.trim()}` } });
  }

  search(term) {
    if (term === '' || term === undefined) {
      this.searchResults = [];
      return;
    }
    this.loadingBar.start();
    this.query = term;
    this.searchService.getSearch(term)
      .subscribe(
        res => {
          this.searchResults = res.results.hits;
          this.searchResults.length === 0 ? this.noResults = true : this.noResults = false;
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
