import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DocsContentPageComponent } from './components/docs-content-page/docs-content-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CoreContentPageComponent } from './components/core-content-page/core-content-page.component';
import { CmsPageComponent } from './components/cms-page/cms-page.component';
import { CodePageComponent } from './components/code-page/code-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { BlogLandingPageComponent } from './components/blog-landing-page/blog-landing-page.component';
import { BlogPostPageComponent } from './components/blog-post-page/blog-post-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'code',
    component: CodePageComponent,
    children: [
      { path: ':library/:version', component: DocsContentPageComponent },
      { path: ':library/:version/:component', component: DocsContentPageComponent }
    ]
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
    path: 'search',
    component: SearchPageComponent,
  },
  {
    path: 'blog',
    component: BlogLandingPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'blog/:slug',
    component: BlogPostPageComponent,
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
