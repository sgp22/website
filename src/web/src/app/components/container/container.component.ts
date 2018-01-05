import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  providers: [PagesService]
})
export class ContainerComponent implements OnInit, AfterViewInit {
  @Input() template;
  @Input() pageType;
  @Input() slug;
  @Input() dataContext;
  @Input() active = false;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {}

}
