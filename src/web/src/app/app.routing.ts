import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ElementPageComponent } from './components/element-page/element-page.component';
import { BlockPageComponent } from './components/block-page/block-page.component';
import { CoreContentPageComponent } from './components/core-content-page/core-content-page.component';
import { DocsContentPageComponent } from './components/docs-content-page/docs-content-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ComponentLoaderComponent } from './components/component-loader/component-loader.component';
import { MainComponent } from './components/main/main.component';


const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: ':slug',
    component: MainComponent
  },
  {
    path: ':slug/:childSlug',
    component: MainComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
