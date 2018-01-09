import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [PagesService],
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('mainNavMobile') mobileNavItem: ElementRef;
  @Input() globalNav;
  public navItems: any;
  public domain: string = DOMAIN;
  public navToggle = false;

  constructor(
    private pagesService: PagesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.navItems = this.globalNav;
    console.log(this.globalNav);
  }

  ngAfterViewInit() {
    // this.navItems = this.globalNav;
    // console.log(this.globalNav);
  }

  toggleNav() {
    this.navToggle = !this.navToggle;
  }

  closeNav() {
    this.navToggle = false;
  }

}
