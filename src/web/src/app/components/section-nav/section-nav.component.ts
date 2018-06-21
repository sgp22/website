import { Component, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface navItems {
  label: string;
  id: string;
}

@Component({
  selector: 'section-nav',
  templateUrl: './section-nav.component.html'
})
export class SectionNavComponent implements AfterViewInit {
  public sectionNavItems: navItems[] = [];
  public landingPage;
  @Input() loading;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngAfterViewInit() {

    this.route.url.subscribe(urlSegment => {

      this.sectionNavItems = [];

      const lastSegment = urlSegment.slice(-1)[0].path;
      if (lastSegment === 'latest' || lastSegment === 'index') {
        this.landingPage = true
      } else {
        this.landingPage = false;
      }

      if (!this.loading) {
        setTimeout(() => {
          const titles = [].slice.call(document.querySelectorAll('h2'));
          titles.map((item) => {
            this.sectionNavItems.push({
              label: item.innerText,
              id: item.id
            });
          });
          this.pageLoadToSection();
        }, 200);
      }

    });

  }

  pageLoadToSection() {
    const tree = this.router.parseUrl(this.router.url);
    if (tree.fragment) {
      this.scrollToSection(tree.fragment);
    }
  }

  clickToSection() {
    this.route.fragment.subscribe(fragment => this.scrollToSection(fragment));
  }

  scrollToSection(fragment) {
    const section = document.querySelector('#' + fragment);
    if (section) {
      section.scrollIntoView(true);
      const scrolledY = window.scrollY;
      if (scrolledY) {
        window.scroll(0, scrolledY - 90);
      }
    }
  }
}

