import { Component, OnInit, Input } from '@angular/core';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [PagesService]
})
export class HeaderComponent implements OnInit {

  @Input() hideGlobalNav: any;
  public navItems: any;

  constructor(
    private pagesService: PagesService
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
