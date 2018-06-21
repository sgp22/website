import { Component, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'section-nav',
  templateUrl: './section-nav.component.html'
})
export class SectionNavComponent implements AfterViewInit {
  public sectionNavItems = [];
  @Input() loading;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngAfterViewInit() {

    this.route.url.subscribe(urlSegment => {

      this.sectionNavItems = [];

      if (!this.loading) {
        setTimeout(() => {
          const titles = [].slice.call(document.querySelectorAll('h2'));
          titles.map((item) => {
            this.sectionNavItems.push({
              label: item.innerText,
              id: item.id
            })
          });
          this.pageLoadScroll();
        });
      }

    });

  }

  pageLoadScroll() {
    const tree = this.router.parseUrl(this.router.url);
    if (tree.fragment) {
      this.scrollToSection(tree.fragment);
    }
  }

  clickToScroll() {
    this.route.fragment.subscribe(fragment => this.scrollToSection(fragment));
  }

  scrollToSection(fragment) {
    const section = document.querySelector("#" + fragment)
    if (section) {
      section.scrollIntoView(true);
      const scrolledY = window.scrollY;
      if (scrolledY) {
        window.scroll(0, scrolledY - 90);
      }
    }
  }
}

