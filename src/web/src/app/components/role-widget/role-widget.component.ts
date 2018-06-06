import { Component, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'role-widget',
  templateUrl: './role-widget.component.html'
})
export class RoleWidgetComponent implements AfterViewInit {
  public rolesOpen = false;
  public fabStateActive = false;
  public fabIcon;
  public selectedRole;
  public roleSubmitted = JSON.parse(localStorage.getItem('roleSubmitted')) || false;
  public removeRoleThankyou = JSON.parse(localStorage.getItem('removeRoleThankyou')) || false;

  constructor() { }

  ngAfterViewInit() {}

  toggleRoles() {
    this.rolesOpen = !this.rolesOpen;
    this.fabStateActive = !this.fabStateActive;
    (<any>window).ga('send', 'event', 'feedback', 'click', 'whatisyourrole');
  }

  selectRole(role: String) {
    this.selectedRole = role;
  }

  submitRole(e) {
    e.preventDefault();
    (<any>window).ga('send', 'event', 'feedback', 'submittedrole' , 'whatisyourrole', {'dimension8': this.selectedRole});
    this.roleSubmitted = true;
    localStorage.setItem('roleSubmitted', JSON.stringify(this.roleSubmitted));
    setTimeout(() => {
      this.removeRoleThankyou = true;
      localStorage.setItem('removeRoleThankyou', JSON.stringify(this.removeRoleThankyou));
    }, 1000);
  }
}
