import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'role-widget',
  templateUrl: './role-widget.component.html'
})
export class RoleWidgetComponent implements AfterViewInit {
  public rolesOpen = false;

  constructor() { }

  ngAfterViewInit() {}

  toggleRoles() {
    this.rolesOpen = !this.rolesOpen;
  }

}
