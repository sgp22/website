import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

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
  },
  {
    path: ':slug/:childSlug/:grandChildSlug',
    component: MainComponent
  },
  {
    path: ':slug/:childSlug/:grandChildSlug/:greatGrandChildSlug',
    component: MainComponent
  },
  {
    path: ':slug/:library/:version/:component',
    component: MainComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
