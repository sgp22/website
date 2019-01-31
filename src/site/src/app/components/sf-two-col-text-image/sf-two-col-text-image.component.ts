import { Component, OnInit, Input } from '@angular/core';
import * as validUrl from 'valid-url';

@Component({
  selector: 'sf-two-col-text-image',
  templateUrl: './sf-two-col-text-image.component.html'
})
export class SfTwoColTextImageComponent implements OnInit {
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
  @Input() sidebar: boolean;
  public ctaIsExternalUrl: boolean;

  constructor() { }

  ngOnInit() {
    if (validUrl.isUri(this.ctaLink)) {
      this.ctaIsExternalUrl = true;
    }
  }

}
