import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-core-content-page',
  templateUrl: './core-content-page.component.html'
})

export class CoreContentPageComponent implements OnInit {
  @Input() page;
  @Input() loading;
  public pageContent: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.pageContent = this.page;

  }

}
