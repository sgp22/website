import { Component, OnInit, AfterViewInit, HostBinding, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-core-content-page',
  templateUrl: './core-content-page.component.html',
  providers: [PagesService]
})
export class CoreContentPageComponent implements OnInit, AfterViewInit {
  @Input() page;
  public body: any;
  public streamfields: any;
  public notFound = false;
  public loading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private http: HttpClient
  ) {}

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
        (res: any) => {
          if (res) {
            this.streamfields = res['body'];
            this.notFound = false;
            this.loading = false;
          } else {
            this.notFound = true;
          }
        },
        err => {
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
            this.streamfields = res.items[0].body;
            this.notFound = false;
            this.loading = false;
          } else {
            this.notFound = true;
          }
        },
        err => {
          console.error(err);
        }
      );
  }

}
