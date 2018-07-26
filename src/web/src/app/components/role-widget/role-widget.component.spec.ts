import { RoleWidgetComponent } from '../role-widget/role-widget.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '../../../../node_modules/@angular/core';

describe(' RoleWidgetComponent ', () => {

  let component:  RoleWidgetComponent ;
  let fixture: ComponentFixture< RoleWidgetComponent >

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ RoleWidgetComponent ],
      imports: [BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent( RoleWidgetComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#selectedRole() should set #selectedRole to role', () => {
    let role = 'role';
    component.selectRole(role);
    expect(component.selectedRole).toEqual(role);
  })

  it('#submitRole() should set #roleSubmitted to true and #removeRoleThankyou to false', () => {
    let e = { preventDefault: function () { } };
    component.selectedRole = 'role';
    component.submitRole(e);
    expect(component.roleSubmitted).toBe(true, 'after submit');
    expect(component.removeRoleThankyou).toBe(false, 'after submit');
  });

});
