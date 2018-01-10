import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'app-block-page',
  templateUrl: './block-page.component.html',
  providers: [PagesService]
})

export class BlockPageComponent implements OnInit {
  @Input() page;
  public pageContent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
  ) { }

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
