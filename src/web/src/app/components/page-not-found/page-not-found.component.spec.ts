import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageNotFoundComponent } from './page-not-found.component';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let h1: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent ],
      providers: [
        { provide: Router },
        { provide: ActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance; // test instance
    h1 = fixture.nativeElement.querySelector('h1');
  });

  it('should display a 404 message', () => {
    expect(h1.textContent).toBe('404 Page Not Found');
  });
});
