import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PagesService]
})
export class HomeComponent implements OnInit {
  public page: any;
  public streamfields: any;

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService
  ) { }

  ngOnInit() {
    this.pagesService.getHomePage()
      .subscribe(
        page => {
          this.page = page;
          this.streamfields = page.body;
          console.log(this.page);
        },
        err => {
          console.log(err);
        }
      );
  }

}
