import { Component, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [PagesService]
})
export class HomeComponent {
  @Input() page;
  public pageContent: any;
  public loading = true;

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private router: Router,
  ) {}

  ngAfterViewInit() {

    this.route.params.subscribe(params => {

      const url = this.router.routerState.snapshot.url;
      const preview = url.match(/id=\d{1,10}/g);
      preview ? this.getPreviewContent(preview) : this.getPageContent();

    });

  }

  getPreviewContent(preview) {

    const id = `${this.page.id}/?preview=true`;

    this.pagesService
      .getPage(id)
      .subscribe(
        (res: any) => {
          this.pageContent = res;
          this.loading = false;
        },
        (err) => {
          console.log(err);
        }
    );

  }

  getPageContent() {

    this.pagesService
      .getPage(this.page.id)
      .subscribe(
        (res: any) => {
          this.pageContent = res;
          this.loading = false;
        },
        (err) => {
          console.log(err);
        }
    );

  }

}
