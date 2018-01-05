import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class DisplayGlobalNavService implements OnInit {

  public displayGlobalNav: any;
  public displaySidebarNav: any;

  constructor() {
    this.displayGlobalNav = true;
    this.displaySidebarNav = false;
  }

  ngOnInit() { }

}
