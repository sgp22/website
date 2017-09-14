import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PagesService]
})
export class HomeComponent implements OnInit {
  page: Object;
  
    constructor(
      private route: ActivatedRoute,
      private pagesService: PagesService
    ) { }
  
    ngOnInit() {
      this.pagesService.getHomePage()
        .subscribe(
          page => {
            this.page = page
          },
          err => {
            console.log(err);
          }
        )
    }
  
  }