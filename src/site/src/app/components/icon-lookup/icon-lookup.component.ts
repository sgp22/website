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
  @ViewChild('searchText', { static: true }) searchText: NgForm;
  public icons: any;
  public downloadLinksVisible = [];

  constructor(
    private iconLookup: IconLookupService
  ) { }

  ngOnInit() {
    this.iconLookup.loadIcons(this.iconType)
      .subscribe(res => {
        const icons = res['categories'].map(icon => icon.icons);
        const flattenedIconArr = [].concat.apply([], icons);
        const sortedIcons = flattenedIconArr.sort((a, b) => a > b ? 1 : -1);
        this.icons = sortedIcons;
      });
  }
}
