import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { routing } from './app.routing';
import { HomeComponent } from './components/home/home.component';
import { ElementPageComponent } from './components/element-page/element-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CoreContentPageComponent } from './components/core-content-page/core-content-page.component';
import { DocsContentPageComponent } from './components/docs-content-page/docs-content-page.component';
import { SidebarNavComponent } from './components/sidebar-nav/sidebar-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FullWidthComponent } from './components/full-width/full-width.component';
import { TwoColumnComponent } from './components/two-column/two-column.component';
import { TwoColTextImageComponent } from './components/two-col-text-image/two-col-text-image.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ElementPageComponent,
    LandingPageComponent,
    CoreContentPageComponent,
    DocsContentPageComponent,
    SidebarNavComponent,
    HeaderComponent,
    PageNotFoundComponent,
    FullWidthComponent,
    TwoColumnComponent,
    TwoColTextImageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
