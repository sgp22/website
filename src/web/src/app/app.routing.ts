import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {PageComponent} from './components/page/page.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {ElementPageComponent} from './components/element-page/element-page.component';
import {CoreContentPageComponent} from './components/core-content-page/core-content-page.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: ':slug',
    component: LandingPageComponent
  },
  {
    path: 'design/:slug',
    component: CoreContentPageComponent
  },
  {
    path: 'design/elements/:slug',
    component: ElementPageComponent
  },
  {
    path: 'design/identity/:slug',
    component: CoreContentPageComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
