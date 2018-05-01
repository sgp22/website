import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BlogLandingPageComponent } from './components/blog-landing-page/blog-landing-page.component';
import { CoreContentPageComponent } from './components/core-content-page/core-content-page.component';
import { ElementPageComponent } from './components/element-page/element-page.component';
import { BlockPageComponent } from './components/block-page/block-page.component';
import { BlogPostPageComponent } from './components/blog-post-page/blog-post-page.component';
import { DocsContentPageComponent } from './components/docs-content-page/docs-content-page.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'guidelines',
    component: LandingPageComponent
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
    component: LandingPageComponent
  },
  {
    path: 'examples/:slug',
    component: CoreContentPageComponent
  },
  {
    path: 'resources',
    component: LandingPageComponent
  },
  {
    path: 'resources/:slug',
    component: CoreContentPageComponent
  },
  {
    path: 'blog',
    component: BlogLandingPageComponent
  },
  {
    path: 'blog/:slug',
    component: BlogPostPageComponent
  },
  {
    path: 'code/:library/:version',
    component: DocsContentPageComponent
  },
  {
    path: 'code/:library/:version/:component',
    component: DocsContentPageComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
  // {
  //   path: ':slug/:library/:version/:component',
  //   component: MainComponent
  // }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
