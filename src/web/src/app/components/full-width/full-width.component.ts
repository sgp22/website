import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'full-width',
  templateUrl: './full-width.component.html'
})
export class FullWidthComponent implements OnInit, AfterViewInit {
  @Input() flexible_content: any;
  @Input() title: string;
  @Input() content: string;
  @Input() ctaText: string;
  @Input() ctaLink: string;
  @Input() heroImage: string;
  @Input() heroImageTitle: string;
  @Input() backgroundImage: string;
  @Input() backgroundColor: string;
  @Input() invertTextColor: string;
  @Input() textAlign: string;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {}
}
