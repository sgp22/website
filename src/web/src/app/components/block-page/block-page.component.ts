import { Component, OnInit, DoCheck, AfterViewInit, HostBinding, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { DisplayGlobalNavService } from '../../shared/display-global-nav.service';

@Component({
  selector: 'app-block-page',
  templateUrl: './block-page.component.html',
  providers: [PagesService]
})
export class BlockPageComponent implements OnInit, AfterViewInit {
  @HostBinding('class.iux-row--col-sm-9') iuxRow: any = true;
  @Input() page;
  public pageType: any = 'home.BlocksPage';
  // public page: any;
  public options: any;
  public types: any;
  public states: any;
  public sidebar: any = true;
  public notFound = false;
  public loading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {

    let urlSegment;
    this.route.url.forEach((url) => {
      urlSegment = url[0].path;
    });

    this.route.params.subscribe(params => {
      this.pagesService
        .getPage(this.page.meta.slug, this.page.meta.type)
        .subscribe(
          (res: any) => {
            if (res && res.items.length) {
              this.types = res.items[0].types;
              this.options = res.items[0].options;
              this.states = res.items[0].states;
              this.notFound = false;
              this.loading = false;
            } else {
              this.notFound = true;
            }
          },
          err => {
            console.log(err);
          }
        );

    });

  }

}
