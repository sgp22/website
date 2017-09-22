import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content-banner',
  templateUrl: './content-banner.component.html',
  styleUrls: ['./content-banner.component.css']
})
export class ContentBannerComponent implements OnInit {

  @Input() image: string;
  @Input() header: string;
  @Input() copy: string;
  @Input() link: string;
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
