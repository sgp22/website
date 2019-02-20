import { Component, OnInit, HostListener } from '@angular/core';
import { slideInLeft } from 'src/app/animations';
import { HelpersService } from '../../shared/helpers.service';

@Component({
  selector: 'cms-page',
  templateUrl: './cms-page.component.html',
  animations: [slideInLeft]
})
export class CmsPageComponent implements OnInit {
  public sidebarOpen: string = 'open';

  constructor(
    private h: HelpersService
  ) { }

  ngOnInit() {
    if (this.h.checkViewport('(min-width: 600px)')) {
      this.sidebarOpen = 'closed';
    }
  }

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
