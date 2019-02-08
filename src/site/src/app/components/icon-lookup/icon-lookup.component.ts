import { Component, OnInit, Input } from '@angular/core';
import { IconLookupService } from './icon-lookup.service';

@Component({
  selector: 'icon-lookup',
  templateUrl: './icon-lookup.component.html',
  styleUrls: ['./icon-lookup.component.scss']
})
export class IconLookupComponent implements OnInit {
  @Input() iconType: string;
  public icons: any;

  constructor(
    private iconLookup: IconLookupService
  ) { }

  ngOnInit() {
    this.iconLookup.loadIcons(this.iconType)
      .subscribe(res => {
        this.icons = res['categories'][0]['icons'];
      })
  }

}
