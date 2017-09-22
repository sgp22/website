import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'one-column-banner',
  templateUrl: './one-column-banner.component.html',
  styleUrls: ['./one-column-banner.component.css']
})
export class OneColumnBannerComponent implements OnInit {

  @Input() header: string
  @Input() intro: string
  @Input() image: string  

  constructor() { }

  ngOnInit() {
  }

}
