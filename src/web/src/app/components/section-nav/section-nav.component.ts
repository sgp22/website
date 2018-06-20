import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'section-nav',
  templateUrl: './section-nav.component.html'
})
export class SectionNavComponent implements AfterViewInit {
  public sectionNavItems = [];
  public fragment;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngAfterViewInit() {
    this.route.url.subscribe(urlSegment => {
      setTimeout(() => {
        const titles = [].slice.call(document.querySelectorAll('h2'));
        titles.map((item) => {
          this.sectionNavItems.push({
            label: item.innerText,
            id: item.id
          })
        });
      }, 1000);
    });

  }

  scrollToSection() {
    this.route.fragment.subscribe(f => {
      const section = document.querySelector("#" + f)
      if (section) {
        section.scrollIntoView(true);
        const scrolledY = window.scrollY;
        if (scrolledY) {
          window.scroll(0, scrolledY - 90);
        }
      }
    });

  }

}

