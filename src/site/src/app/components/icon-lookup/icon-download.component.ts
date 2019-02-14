import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'icon-download',
  templateUrl: './icon-download.component.html',
  styleUrls: ['./icon-download.component.scss']
})
export class IconDownloadComponent implements OnInit {
  @Input() iconCategory;
  @Input() iconLabel;
  public baseUrl = environment.apiUrl;

  constructor() { }

  ngOnInit() {
  }

}
