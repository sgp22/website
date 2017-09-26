import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestListBlockComponent } from './test-list-block.component';

describe('TestListBlockComponent', () => {
  let component: TestListBlockComponent;
  let fixture: ComponentFixture<TestListBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestListBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestListBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
