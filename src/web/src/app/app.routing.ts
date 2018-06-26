import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BlogLandingPageComponent } from './components/blog-landing-page/blog-landing-page.component';
import { CoreContentPageComponent } from './components/core-content-page/core-content-page.component';
import { ElementPageComponent } from './components/element-page/element-page.component';
import { BlockPageComponent } from './components/block-page/block-page.component';
import { BlogPostPageComponent } from './components/blog-post-page/blog-post-page.component';
import { DocsContentPageComponent } from './components/docs-content-page/docs-content-page.component';
import { HomeComponent } from './components/home/home.component';
import { SearchPageComponent } from './components/search-page/search-page.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'guidelines',
    component: LandingPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'guidelines/:slug',
    component: CoreContentPageComponent
  },
  {
    path: 'guidelines/identity/:slug',
    component: CoreContentPageComponent
  },
  {
    path: 'guidelines/layout/:slug',
    component: CoreContentPageComponent
  },
  {
    path: 'guidelines/components/elements/:slug',
    component: ElementPageComponent
  },
  {
    path: 'guidelines/components/blocks/:slug',
    component: BlockPageComponent
  },
  {
    path: 'examples',
    component: LandingPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'examples/:slug',
    component: CoreContentPageComponent
  },
  {
    path: 'resources',
    component: LandingPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'resources/:slug',
    component: CoreContentPageComponent
  },
  {
    path: 'blog',
    component: BlogLandingPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'blog/:slug',
    component: BlogPostPageComponent
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
    path: 'site/search',
    component: SearchPageComponent
  },
  {
    path: 'search',
    redirectTo: 'site/search'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
