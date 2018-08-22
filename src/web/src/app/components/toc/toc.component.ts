import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface TocItems {
  label: string;
  id: string;
}

@Component({
  selector: 'toc',
  templateUrl: './toc.component.html'
})
export class TocComponent implements AfterViewInit {
  // public tocItems: TocItems[] = [];
  public landingPage;
  @Input() loading;
  @Input() component;
  @Input() tocItems;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngAfterViewInit() {

    const routeUrl = await this.route.url;
    routeUrl.subscribe(urlSegment => {

      console.log(this.tocItems);
    //   // this.tocItems = [];

    //   const lastSegment = urlSegment.slice(-1)[0].path;
    //   if (lastSegment === 'latest' || lastSegment === 'index') {
    //     this.landingPage = true;
    //   } else {
    //     this.landingPage = false;
    //   }

    //   const titles = [].slice.call(document.querySelectorAll('h2'));
    //   titles.map((item) => {
    //     this.tocItems.push({
    //       label: item.innerText,
    //       id: item.id
    //     });
    //   });
    //   this.pageLoadToSection();

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

