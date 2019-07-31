import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { PagesService } from 'src/app/shared/pages.service';

@Component({
  selector: 'theme-switcher',
  templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherComponent implements AfterViewInit {
  public stylesheetDark: any;
  public stylesheetContrast: any;
  public variants = {
    light: 'light',
    dark: 'dark',
    contrast: 'contrast'
  }
  public userSelectedVariant = this.pagesService.getThemeVariant();

  @Output() themeVariant = new EventEmitter;

  constructor(
    private pagesService: PagesService
  ) { }

  ngAfterViewInit() {
    this.stylesheetDark = document.createElement('link');
    this.stylesheetDark.rel = 'stylesheet';
    this.stylesheetDark.href = 'theme-dark.css';

    this.stylesheetContrast = document.createElement('link');
    this.stylesheetContrast.rel = 'stylesheet';
    this.stylesheetContrast.href = 'theme-contrast.css';

    const darkMode = window.matchMedia('(prefers-color-scheme: dark)');

    if (this.userSelectedVariant === null) {
      if (darkMode.matches === true) {
        this.setTheme(this.stylesheetDark, this.variants.dark);
      }
    }

    darkMode.addListener((e) => {
      if (e.matches === true) {
        this.setTheme(this.stylesheetDark, this.variants.dark);
      } else {
        this.removeTheme(this.stylesheetDark);
        this.setTheme(null, this.variants.light);
      }
    });


    if (this.pagesService.getThemeVariant() === this.variants.light) {
      this.themeVariantDefault();
    }
    if (this.pagesService.getThemeVariant() === this.variants.dark) {
      this.themeVariantDark();
    }
    if (this.pagesService.getThemeVariant() === this.variants.contrast) {
      this.themeVariantContrast();
    }
  }

  themeVariantDefault() {
    this.removeTheme(this.stylesheetContrast);
    this.removeTheme(this.stylesheetDark);
    this.setTheme(null, this.variants.light);
    this.pagesService.setThemeVariant(this.variants.light);
  }

  themeVariantDark() {
    this.removeTheme(this.stylesheetContrast);
    this.setTheme(this.stylesheetDark, this.variants.dark);
    this.pagesService.setThemeVariant(this.variants.dark);
  }

  themeVariantContrast() {
    this.removeTheme(this.stylesheetDark);
    this.setTheme(this.stylesheetContrast, this.variants.contrast);
    this.pagesService.setThemeVariant(this.variants.contrast);
  }

  removeTheme(stylesheet: any) {
    if (document.head.contains(stylesheet)) {
      document.head.removeChild(stylesheet);
    }
  }

  setTheme(stylesheet: any, variant: string) {
    if (stylesheet) {
      document.head.appendChild(stylesheet);
    }
    this.setThemeVariant(variant);
  }

  setThemeVariant(variant: String) {
    this.themeVariant.emit(variant);
  }
}
