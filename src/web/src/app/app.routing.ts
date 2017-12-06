import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ElementPageComponent } from './components/element-page/element-page.component';
import { CoreContentPageComponent } from './components/core-content-page/core-content-page.component';
import { DocsContentPageComponent } from './components/docs-content-page/docs-content-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


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
  },
  {
    path: 'develop/:library/:version/:component',
    component: DocsContentPageComponent
  },
  {
    path: 'develop/:library/:version',
    component: DocsContentPageComponent
  },
  {
    path: 'develop/:library/latest',
    component: DocsContentPageComponent
  },
  {
    path: 'about',
    component: CoreContentPageComponent
  },
  {
    path: 'examples',
    component: CoreContentPageComponent
  },
  {
    path: 'resources',
    component: CoreContentPageComponent
  },
  {
    path: 'resources/:slug',
    component: CoreContentPageComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
