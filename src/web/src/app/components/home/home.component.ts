import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [PagesService]
})
export class HomeComponent implements AfterViewInit {
  @Input() page;
  @ViewChild('whiteDotPattern') whiteDotPattern:ElementRef;
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

    const dotPatternPaths = this.whiteDotPattern.nativeElement.children[0].children;

    for (let i = 0; i < dotPatternPaths.length; i++) {
      dotPatternPaths[i].style.transform = `translate(-${Math.floor(Math.random() * 100)}px, ${Math.floor(Math.random() * 100)}px)`;
    }

    setTimeout(() => {
      this.whiteDotPattern.nativeElement.classList.add('white-dot-pattern--loaded');
    }, 100);

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
