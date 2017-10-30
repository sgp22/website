import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class DisplayGlobalNavService implements OnInit {

  public displayGlobalNav: any;

  constructor() {
    this.displayGlobalNav = true;
  }

  ngOnInit() {}

}
