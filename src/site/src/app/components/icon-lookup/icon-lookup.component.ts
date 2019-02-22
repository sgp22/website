import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IconLookupService } from './icon-lookup.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'icon-lookup',
  templateUrl: './icon-lookup.component.html',
  styleUrls: ['./icon-lookup.component.scss']
})
export class IconLookupComponent implements OnInit {
  @Input() iconType: string;
  @ViewChild('searchText') searchText: NgForm;
  public icons: any;
  public downloadLinksVisible = [];

  constructor(
    private iconLookup: IconLookupService
  ) { }

  ngOnInit() {
    this.iconLookup.loadIcons(this.iconType)
      .subscribe(res => {
        this.icons = res['categories'][0]['icons'];
      });
  }

}
