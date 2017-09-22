import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {GettingStartedComponent} from './components/getting-started/getting-started.component';
import {PageComponent} from './components/page/page.component';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'getting-started',
    component: GettingStartedComponent
  },
  {
    path: 'pages/:slug',
    component: PageComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
