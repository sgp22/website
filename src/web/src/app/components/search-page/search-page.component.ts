import { Component, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html'
})
export class SearchPageComponent implements AfterViewInit {
  @Input() loading;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngAfterViewInit() {}
}

