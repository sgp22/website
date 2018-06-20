import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'section-nav',
  templateUrl: './section-nav.component.html'
})
export class SectionNavComponent implements AfterViewInit {
  public sectionNavItems = [];

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

  scrollToSection(id) {
    console.log(id);
  }

}

