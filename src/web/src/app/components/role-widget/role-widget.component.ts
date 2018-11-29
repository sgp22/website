import { Component, AfterViewInit, ViewChild } from '@angular/core';
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
  @ViewChild('thankYou') thankYou;

  constructor() { }

  ngAfterViewInit() {}

  toggleRoles() {
    this.rolesOpen = !this.rolesOpen;
    this.fabStateActive = !this.fabStateActive;
    try {
      (<any>window).ga('send', 'event', 'feedback', 'click', 'whatisyourrole');
    } catch (error) {
      console.error(error);
    }
  }

  selectRole(role: String) {
    this.selectedRole = role;
  }

  submitRole(e) {
    e.preventDefault();

    if (this.selectedRole === undefined) {
      return;
    }

    try {
      (<any>window).ga('send', 'event', 'feedback', 'submittedrole' , 'whatisyourrole', {'dimension8': this.selectedRole});
    } catch (error) {
      console.error(error);
    }

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

  thankyouStateEnd(e) {
    if (e.toState === true) {
      this.thankYou.nativeElement.remove();
    }
  }
}
