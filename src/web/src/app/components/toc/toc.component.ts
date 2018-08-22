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
  public landingPage;
  @Input() loading;
  @Input() component;
  @Input() tocItems;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngAfterViewInit() {}

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

