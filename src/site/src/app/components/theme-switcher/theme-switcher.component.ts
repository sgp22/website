import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PagesService } from 'src/app/shared/pages.service';

@Component({
  selector: 'theme-switcher',
  templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherComponent implements OnInit {
  public stylesheetDark: any;
  public stylesheetContrast: any;
  public variants = {
    light: 'light',
    dark: 'dark',
    contrast: 'contrast'
  }

  @Output() themeVariant = new EventEmitter;

  constructor(
    private pagesService: PagesService
  ) { }

  ngOnInit() {
    this.stylesheetDark = document.createElement('link');
    this.stylesheetDark.rel = 'stylesheet';
    this.stylesheetDark.href = 'theme-dark.css';

    this.stylesheetContrast = document.createElement('link');
    this.stylesheetContrast.rel = 'stylesheet';
    this.stylesheetContrast.href = 'theme-contrast.css';

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
    if (document.head.contains(this.stylesheetContrast)) {
      document.head.removeChild(this.stylesheetContrast);
    }

    if (document.head.contains(this.stylesheetDark)) {
      document.head.removeChild(this.stylesheetDark);
    }

    this.setThemeVariant(this.variants.light);
    this.pagesService.setThemeVariant(this.variants.light);
  }

  themeVariantDark() {
    if (document.head.contains(this.stylesheetContrast)) {
      document.head.removeChild(this.stylesheetContrast);
    }
    document.head.appendChild(this.stylesheetDark);
    this.setThemeVariant(this.variants.dark);
    this.pagesService.setThemeVariant(this.variants.dark);
  }

  themeVariantContrast() {
    if (document.head.contains(this.stylesheetDark)) {
      document.head.removeChild(this.stylesheetDark);
    }
    document.head.appendChild(this.stylesheetContrast);
    this.setThemeVariant(this.variants.contrast);
    this.pagesService.setThemeVariant(this.variants.contrast);
  }

  setThemeVariant(variant: String) {
    this.themeVariant.emit(variant);
  }
}
