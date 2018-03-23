import { Component, Input, AfterViewInit, ElementRef, QueryList, ViewChild, ViewChildren, HostListener } from '@angular/core';
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
  @ViewChild('section1') section1:ElementRef;
  public dotPatternPaths;
  public hpSections;
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

    this.dotPatternPaths = this.whiteDotPattern.nativeElement.children[0].children;
    this.animateDots(this.dotPatternPaths);

    const slideInAt = (window.innerHeight) - this.section1.nativeElement.offsetHeight / 2;
    const isHalfShown = slideInAt > this.section1.nativeElement.offsetTop;
    if (isHalfShown) {
      this.section1.nativeElement.classList.add('section--visible');
    }

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

  private animateDots(pattern) {

    for (let i = 0; i < pattern.length; i++) {
      pattern[i].classList.add(`dot--${i}`);
      pattern[i].style.transform = `translate(-${Math.floor(Math.random() * 100)}px, ${Math.floor(Math.random() * 100)}px)`;
    }

    setTimeout(() => {
      for (let i = 0; i < pattern.length; i++) {
        pattern[i].style.transform = `translate(0px, 0px)`;
      }
    }, 100);

    setTimeout(() => {
      this.whiteDotPattern.nativeElement.classList.add('white-dot-pattern--settled');
    }, 2300);

    setInterval(() => {
      setPulseClass()
    }, 2000);

    function setPulseClass() {
      const numberOfDots = pattern.length;
      let random = Math.floor((Math.random() * 279) + 1);
      [].slice.call(pattern).forEach(el => {
        el.classList.remove('dot--pulse');
      });
      pattern[random].classList.add('dot--pulse');
    }
  }

  @HostListener('window:scroll', ['$event'])
  private scrollAnimations(){
    this.checkSection();
  }

  private checkSection() {
    const sections = document.querySelectorAll('section');
    [].slice.call(sections).forEach((section) => {
      const slideInAt = (window.scrollY + window.innerHeight) - section.offsetHeight / 5;
      const isHalfShown = slideInAt > section.offsetTop;
      if (isHalfShown) {
        section.classList.add('section--visible');
      }
    });
  }

}

