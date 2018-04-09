import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'types',
  templateUrl: './types.component.html',
})

export class TypesComponent implements OnInit {
  @Input() types;

  constructor() {}

  ngOnInit() {
    console.log(this.types);
  }
}
