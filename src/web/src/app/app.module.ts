import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { routing } from './app.routing';
import { HomeComponent } from './components/home/home.component';
import { ElementPageComponent } from './components/element-page/element-page.component';
import { BlockPageComponent } from './components/block-page/block-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CoreContentPageComponent } from './components/core-content-page/core-content-page.component';
import { DocsContentPageComponent } from './components/docs-content-page/docs-content-page.component';
import { SidebarNavComponent } from './components/sidebar-nav/sidebar-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FullWidthComponent } from './components/sf-full-width/sf-full-width.component';
import { TwoColumnComponent } from './components/sf-two-column/sf-two-column.component';
import { TwoColTextImageComponent } from './components/sf-two-col-text-image/sf-two-col-text-image.component';

import { InlineSVGModule } from 'ng-inline-svg';

import { SafeHtmlPipe } from './shared/safeHtml.pipe';
import { ComponentLoaderComponent } from './components/component-loader/component-loader.component';
import { ContainerComponent } from './components/container/container.component';
import { MainComponent } from './components/main/main.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ElementPageComponent,
    BlockPageComponent,
    LandingPageComponent,
    CoreContentPageComponent,
    DocsContentPageComponent,
    SidebarNavComponent,
    HeaderComponent,
    PageNotFoundComponent,
    FullWidthComponent,
    TwoColumnComponent,
    TwoColTextImageComponent,
    SafeHtmlPipe,
    ComponentLoaderComponent,
    ContainerComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InlineSVGModule,
    routing,
    LoadingBarHttpClientModule
  ],
  entryComponents: [
    ContainerComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
