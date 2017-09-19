import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { routing } from './app.routing';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import { HomeComponent } from './components/home/home.component';
import { PageComponent } from './components/page/page.component';
import { ContentBannerComponent } from './components/molecules/content-banner/content-banner.component';
import { OneColumnBannerComponent } from './components/molecules/one-column-banner/one-column-banner.component';
import { StreamfieldsComponent } from './components/streamfields/streamfields.component';

@NgModule({
  declarations: [
    AppComponent,
    GettingStartedComponent,
    HomeComponent,
    PageComponent,
    ContentBannerComponent,
    OneColumnBannerComponent,
    StreamfieldsComponent,
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
