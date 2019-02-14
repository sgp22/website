import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss']
})
export class BackToTopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scrollTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

}
