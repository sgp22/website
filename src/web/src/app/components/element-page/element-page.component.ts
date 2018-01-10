import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'app-element-page',
  templateUrl: './element-page.component.html',
  providers: [PagesService]
})

export class ElementPageComponent implements OnInit, AfterViewInit {
  @Input() page;
  public pageContent;
  public loading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
  ) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  ngAfterViewInit() {

    this.route.params.subscribe(params => {
      const url = this.router.routerState.snapshot.url;
      const preview = url.match(/preview=true&id=\d{1,10}/g);
      const previewId = `${this.page.id}/?preview=true`;
      preview ? this.getPageContent(previewId) : this.getPageContent(this.page.id);
    });

  }

  getPageContent(id) {

    this.pagesService
      .getPage(id)
      .subscribe(
        (res: any) => {
          this.pageContent = res;
          this.loading = false;
        },
        (err) => {
          console.error(err);
        }
      );

  }

}
