import { Component, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [PagesService]
})
export class HomeComponent {
  public slugs: any;
  public pageType: any = 'home.LandingPage';
  public page: any;
  public flexibleContent: any;
  public docs: any;
  public docsBody: any;
  public streamfields: any;
  public notFound = false;
  public loading = true;
  @Input() template;
  @Input() dataContext;

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private router: Router,
  ) {

    this.route.params.subscribe(params => {

      const url = this.router.routerState.snapshot.url;
      const preview = url.match(/id=\d{1,10}/g);
      preview ? this.getPreviewContent(preview) : this.getPageContent();

    });

  }

  getPreviewContent(preview) {

    const id = `${preview.toString().match(/\d{1,10}/g)}/?preview=true`;

    this.pagesService
      .getPreview(id)
      .subscribe(
        (res: any) => {
          if (res) {
            this.page = res;
            this.flexibleContent = res['content'];
            this.notFound = false;
            this.loading = false;
          } else {
            this.notFound = true;
          }
        },
        (err) => {
          console.log(err);
        }
    );

  }

  getPageContent() {
    this.pagesService
      .getPage('home', this.pageType)
      .subscribe(
        (res: any) => {
          if (res && res.items.length) {
            this.page = res.items[0];
            this.flexibleContent = res.items[0].content;
            this.notFound = false;
            this.loading = false;
          } else {
            this.notFound = true;
          }
        },
        (err) => {
          console.log(err);
        }
    );
  }

}
