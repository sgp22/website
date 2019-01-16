import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate, query } from "@angular/animations";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('moveIn', [
      transition('* => *', [
        query(':enter', style({ transform: 'translateX(-100%)' }), { optional: true }),
        query(':enter', animate('200ms', style({ transform: 'translateX(0px)' })), { optional: true })
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {
  sidebarPath: string;
  sidebarNav: any;
  loading: boolean;

  constructor(
    private sidebarService: SidebarService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.sidebarPath = `${params.library}/${params.version}`;
      this.sidebarService.loadSitemap(this.sidebarPath).subscribe(res => {
        this.sidebarNav = res['sections'];
        console.log(this.sidebarNav);
        this.loading = false;
      })
    })
  }

}
