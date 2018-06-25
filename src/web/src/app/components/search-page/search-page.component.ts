import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html'
})
export class SearchPageComponent implements AfterViewInit {
  public searchQuery = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngAfterViewInit() {}

  onEnter(value: string) {
    console.log(value);
  }
}

