import { Component } from '@angular/core';
import { PagesService } from './services/pages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PagesService]
})
export class AppComponent {

  public sidebar: boolean = true;
  public sidebarNav: any;

  constructor(
    private pagesService: PagesService
  ){
    this.pagesService.getSideBarNav()
      .subscribe(
        (res) => {
          this.sidebarNav = res;
          console.log(this.sidebarNav);
        }
      )
  }

}
