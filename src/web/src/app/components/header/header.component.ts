import { Component, OnInit, Input } from '@angular/core';
import { PagesService } from '../../services/pages.service';
import { DisplayGlobalNavService } from '../../shared/display-global-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [PagesService, DisplayGlobalNavService]
})
export class HeaderComponent implements OnInit {

  @Input() displayGlobalNav: any;
  public navItems: any;

  constructor(
    private pagesService: PagesService,
    private globalNav: DisplayGlobalNavService
  ) { }

  ngOnInit() {
    this.pagesService.getGlobalNav()
      .subscribe(
        (res: any) => {
          this.navItems = res.items;
        }
      );
  }

}
