import { Component, OnInit, Input } from '@angular/core';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css'],
  providers: [PagesService]
})
export class SidebarNavComponent implements OnInit {

  @Input() sidebar: boolean;
  @Input() sidebarNav: any;

  constructor(
    private pagesService: PagesService
  ) { }

  ngOnInit() {}

}
