import { Component, OnInit, Input, ElementRef, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'site-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() page;
  @ViewChild('whiteDotPattern') whiteDotPattern: ElementRef;
  @ViewChild('section1') section1: ElementRef;
  public dotPatternPaths;
  public hpSections;
  public pageContent: any;
  public loading = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // this.checkFirstSection();
  }

  private checkFirstSection() {
    const slideInAt = (window.innerHeight) - this.section1.nativeElement.offsetHeight / 20;
    const isHalfShown = slideInAt > this.section1.nativeElement.offsetTop;
    if (isHalfShown) {
      this.section1.nativeElement.classList.add('section--visible');
    }
  }

  @HostListener('window:scroll', ['$event'])
  private scrollAnimations() {
    this.checkSection();
  }

  private checkSection() {
    const sections = document.querySelectorAll('section');
    [].slice.call(sections).forEach((section) => {
      const slideInAt = (window.pageYOffset + window.innerHeight) - section.offsetHeight / 3;
      const isThirdShown = slideInAt > section.offsetTop;
      if (isThirdShown) {
        section.classList.add('section--visible');
      }
    });
  }

  private getIEVersion() {
    const sAgent = window.navigator.userAgent;
    const Idx = sAgent.indexOf('MSIE');

    if (Idx > 0) {
      return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf('.', Idx)), 10); // If IE, return version number.
    } else if (!!navigator.userAgent.match(/Trident\/7\./)) {
      return 11; // If IE 11 then look for Updated user agent string.
    } else if (/Edge\/\d./i.test(navigator.userAgent)) {
      return 'edge';
    } else {
      return 0; // It is not IE
    }
  }

}
