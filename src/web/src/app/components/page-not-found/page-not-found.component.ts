import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent implements OnInit {
  public url;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.url.subscribe(urlSegment => {
      this.url = this.router.routerState.snapshot.url;
      (<any>window).ga('send', 'event', 'Error', '404', this.url);
    })
  }

}
