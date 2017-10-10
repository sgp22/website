import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { routing } from './app.routing';
import { HomeComponent } from './components/home/home.component';
import { PageComponent } from './components/page/page.component';
import { ContentBannerComponent } from './components/molecules/content-banner/content-banner.component';
import { OneColumnBannerComponent } from './components/molecules/one-column-banner/one-column-banner.component';
import { StreamfieldsComponent } from './components/streamfields/streamfields.component';
import { TestListBlockComponent } from './components/molecules/test-list-block/test-list-block.component';
import { ElementPageComponent } from './components/element-page/element-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CoreContentPageComponent } from './components/core-content-page/core-content-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageComponent,
    ContentBannerComponent,
    OneColumnBannerComponent,
    StreamfieldsComponent,
    TestListBlockComponent,
    ElementPageComponent,
    LandingPageComponent,
    CoreContentPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
