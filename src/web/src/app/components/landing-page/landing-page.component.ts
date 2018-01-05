import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  providers: [PagesService]
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  @Input() page;
  public pageContent: any;
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
