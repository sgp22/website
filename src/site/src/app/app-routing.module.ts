import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DocsContentPageComponent } from './components/docs-content-page/docs-content-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CoreContentPageComponent } from './components/core-content-page/core-content-page.component';
import { CmsPageComponent } from './components/cms-page/cms-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'code/:library/:version',
    component: DocsContentPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'code/:library/:version/:component',
    component: DocsContentPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'guidelines',
    component: CmsPageComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: ':slug', component: CoreContentPageComponent },
      { path: 'identity/:slug', component: CoreContentPageComponent },
      { path: 'layout/:slug', component: CoreContentPageComponent },
      { path: 'patterns/:slug', component: CoreContentPageComponent },
      { path: 'platforms/:slug', component: CoreContentPageComponent }
    ]
  },
  {
    path: 'examples',
    component: CmsPageComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: ':slug', component: CoreContentPageComponent },
    ]
  },
  {
    path: 'resources',
    component: CmsPageComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: ':slug', component: CoreContentPageComponent },
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
