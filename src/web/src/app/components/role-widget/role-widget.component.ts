import { Component, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'role-widget',
  templateUrl: './role-widget.component.html',
  animations: [
    trigger('thankyouState', [
      state('false', style({
        opacity: 1
      })),
      state('true', style({
        opacity: 0
      })),
      transition('false => true', animate('200ms ease-out')),
      transition('true => false', animate('200ms ease-in'))
    ])
  ]
})
export class RoleWidgetComponent implements AfterViewInit {
  public rolesOpen = false;
  public fabStateActive = false;
  public fabIcon;
  public selectedRole;
  public roleSubmitted = JSON.parse(localStorage.getItem('roleSubmitted')) || false;
  public removeRoleThankyou = JSON.parse(localStorage.getItem('removeRoleThankyou')) || true;

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
    this.removeRoleThankyou = false;
    localStorage.setItem('roleSubmitted', JSON.stringify(this.roleSubmitted));
    setTimeout(() => {
      this.removeRoleThankyou = true;
      localStorage.setItem('removeRoleThankyou', JSON.stringify(this.removeRoleThankyou));
    }, 3000);
  }

  scrollToFooter() {
    const footer = document.querySelector('.site-footer');
    if (footer) {
      footer.scrollIntoView();
    }
  }
}
