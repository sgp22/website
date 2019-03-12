import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import Flickity from 'flickity-fade';

@Component({
  selector: 'site-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('heroSlider') heroSlider: ElementRef;
  @ViewChild('heroSliderNav') heroSliderNav: ElementRef;

  constructor() {}

  ngOnInit() {
    this.initHeroSlider();
  }

  initHeroSlider() {
    const heroSlider = this.heroSlider.nativeElement;
    const heroFlkty = new Flickity(heroSlider, {
      cellAlign: 'center',
      prevNextButtons: false,
      wrapAround: false,
      pageDots: true,
      selectedAttraction: 0.015,
      fade: true
    });

    const cellsButtonGroup = document.querySelector('.hero-slider-nav');
    const cellsButtons = Array.from(document.querySelectorAll('.hero-slider-nav__item'));
    heroFlkty.on('select', function() {
      const previousSelectedButton = cellsButtonGroup.querySelector('.hero-slider-nav__item--selected');
      const selectedButton = cellsButtons[heroFlkty.selectedIndex];
      previousSelectedButton.classList.remove('hero-slider-nav__item--selected');
      selectedButton.classList.add('hero-slider-nav__item--selected');
    });

    cellsButtonGroup.addEventListener('click', function (event) {
      const el = event.target as HTMLElement;
      if (!el.classList.contains('hero-slider-nav__item')) {
        return;
      }
      const index = cellsButtons.indexOf(el);
      heroFlkty.select(index);
    });

    const h1s = Array.from(document.querySelectorAll('.hero-slider__slide h1'));
    heroFlkty.on('scroll', function(event, progress) {
      heroFlkty.slides.forEach(function (slide, i) {
        var h1 = h1s[i] as HTMLElement;
        var x = (slide.target + heroFlkty.x) * -1 / 20;
        h1.style.transform = 'translateX( ' + x + 'px)';
      });
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
