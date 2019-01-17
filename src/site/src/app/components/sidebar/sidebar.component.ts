import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate, query } from "@angular/animations";
import { HelpersService } from '../../shared/helpers.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public sidebarPath: string;
  public sidebarNav: any;
  public loading: boolean;
  public expandedLevel1: any = [];

  constructor(
    private sidebarService: SidebarService,
    private route: ActivatedRoute,
    private helpers: HelpersService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.sidebarPath = `${params.library}/${params.version}`;
      this.sidebarService.loadSitemap(this.sidebarPath).subscribe(res => {
        this.sidebarNav = res['sections'];
        this.loading = false;
      })
    })
  }

}
