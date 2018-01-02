import { Component, AfterContentInit, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { ComponentLoaderComponent } from '../component-loader/component-loader.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements AfterContentInit {
  @ViewChild('homeTemplate') homeTemplate;
  @ViewChild('landingTemplate') landingTemplate;
  @ViewChild('coreTemplate') coreTemplate;
  @ViewChild(ComponentLoaderComponent) componentLoader: ComponentLoaderComponent;

  constructor(private route: ActivatedRoute) { }

  ngAfterContentInit() {

    this.route.params.subscribe(params => {
      const keys = Object.keys(params);
      switch (keys.length) {
        case 0:
          this.componentLoader.loadComponent('home.LandingPage', params.slug, this.homeTemplate, {});
          break;
        case 1:
          this.componentLoader.loadComponent('home.LandingPage', params.slug, this.landingTemplate, {});
          break;
        case 2:
          this.componentLoader.loadComponent('home.CoreContentPage', params.childSlug, this.coreTemplate, {});
          break;
      }

    });

  }

}
