import { Component, AfterViewInit, HostBinding } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-core-content-page',
  templateUrl: './core-content-page.component.html',
  providers: [PagesService]
})

export class CoreContentPageComponent implements AfterViewInit {
  public pageContent: any;
  public loading = true;
  @HostBinding('class.ids-row--offset-xl-2')
  @HostBinding('class.ids-row--offset-sm-3')
  @HostBinding('class.ids-row--col-sm-9')
  @HostBinding('class.ids-row--col-xl-10') grid = true;

  constructor(
    private router: Router,
    private pagesService: PagesService,
    private loadingBar: LoadingBarService
  ) {}

  ngAfterViewInit() {

    this.renderPage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.renderPage();
      }
    });

  }

  private renderPage() {
    this.loadingBar.start();
    this.pagesService.createPage(this.router.url)
      .subscribe(
        res => {
          this.pageContent = res;
        },
        err => {
          console.error(err);
        },
        () =>{
          this.loadingBar.complete();
          this.loading = false;
        }
      )
  }

}
