import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sf-two-col-text-image',
  templateUrl: './two-col-text-image.component.html'
})
export class TwoColTextImageComponent implements OnInit {
  @Input() title: string;
  @Input() content: string;
  @Input() ctaText: string;
  @Input() ctaLink: string;
  @Input() image: string;
  @Input() imageTitle: string;
  @Input() backgroundImage: string;
  @Input() backgroundColor: string;
  @Input() invertTextColor: string;
  @Input() imageAlign: string;

  constructor() {}

  ngOnInit() {}
}
