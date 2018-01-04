import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html'
})
export class ContainerComponent implements OnInit {
  @Input() template;
  @Input() pageType;
  @Input() slug;
  @Input() dataContext;
  @Input() active = false;

  constructor() { }

  ngOnInit() {}

}
