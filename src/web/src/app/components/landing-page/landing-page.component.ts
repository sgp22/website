import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  providers: [PagesService]
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  @Input() page;
  public flexibleContent: any;
  public pageType: any = 'home.LandingPage';
  public notFound = false;
  public loading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {

    this.route.params.subscribe(params => {

      const url = this.router.routerState.snapshot.url;
      const preview = url.match(/id=\d{1,10}/g);
      preview ? this.getPreviewContent(preview) : this.getPageContent(this.page.meta.slug);

    });

  }

  getPreviewContent(preview) {

    const id = `${preview.toString().match(/\d{1,10}/g)}/?preview=true`;

    this.pagesService
      .getPreview(id)
      .subscribe(
        (res) => {
          if (res) {
            this.flexibleContent = res['content'];
            this.notFound = false;
            this.loading = false;
          } else {
            this.notFound = true;
          }
        },
        (err) => {
          console.error(err);
        }
      );

  }

  getPageContent(slug) {

    this.pagesService
      .getPage(slug, this.page.meta.type)
      .subscribe(
        (res: any) => {
          if (res && res.items.length) {
            this.flexibleContent = res.items[0].content;
            this.notFound = false;
            this.loading = false;
          } else {
            this.notFound = true;
          }
        },
        (err) => {
          console.error(err);
        }
      );

  }

}
