import { Component, OnInit, HostListener } from '@angular/core';
import { slideInLeft } from 'src/app/animations';

@Component({
  selector: 'cms-page',
  templateUrl: './cms-page.component.html',
  animations: [slideInLeft]
})
export class CmsPageComponent implements OnInit {
  public sidebarOpen: string = 'open';

  constructor() { }

  ngOnInit() {}

  @HostListener('window:resize', ['$event'])
  windowResize(event) {
    if (event.target.innerWidth <= 600) {
      this.sidebarOpen = 'closed'
    } else {
      this.sidebarOpen = 'open'
    }
  }

  openSidebar() {
    this.sidebarOpen = 'open';
  }

  closeSidebar() {
    this.sidebarOpen = 'closed';
  }

}
