import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd} from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-core-content-page',
  templateUrl: './core-content-page.component.html',
  providers: [PagesService]
})

export class CoreContentPageComponent implements OnInit {
  @Input() page;
  @Input() loading;
  public pageContent: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService
  ) {}

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    this.pageContent = this.page;

  }

}
