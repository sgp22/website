import { Component, OnInit, Input, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import Flickity from 'flickity';

@Component({
  selector: 'site-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() page;
  @ViewChild('whiteDotPattern') whiteDotPattern: ElementRef;
  @ViewChild('section1') section1: ElementRef;
  @ViewChild('heroSlider') heroSlider: ElementRef;
  @ViewChild('heroSliderNav') heroSliderNav: ElementRef;
  public dotPatternPaths;
  public hpSections;
  public pageContent: any;
  public loading = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.initHeroSlider();
  }

  initHeroSlider() {
    const heroSlider = this.heroSlider.nativeElement;
    const heroFlkty = new Flickity(heroSlider, {
      cellAlign: 'center',
      prevNextButtons: false,
      wrapAround: false,
      pageDots: false
    });
    var cellsButtonGroup = document.querySelector('.hero-slider-nav');
    var cellsButtons = Array.from(document.querySelectorAll('.hero-slider-nav__item'));
    heroFlkty.on('select', function() {
      var previousSelectedButton = cellsButtonGroup.querySelector('.hero-slider-nav__item--selected');
      var selectedButton = cellsButtons[heroFlkty.selectedIndex];
      previousSelectedButton.classList.remove('hero-slider-nav__item--selected');
      selectedButton.classList.add('hero-slider-nav__item--selected');
    })
    cellsButtonGroup.addEventListener('click', function (event) {
      const el = event.target as HTMLElement;
      if (!el.classList.contains('hero-slider-nav__item')) {
        return;
      }
      const index = cellsButtons.indexOf(el);
      heroFlkty.select(index);
    });
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
