import { Component, DoCheck } from '@angular/core';
import { DisplayGlobalNavService } from './shared/display-global-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DisplayGlobalNavService]
})
export class AppComponent implements DoCheck {

  public displayGlobalNav: any;

  constructor(private globalNav: DisplayGlobalNavService) {}

  ngDoCheck() {
    this.displayGlobalNav = this.globalNav.displayGlobalNav;
  }

}
