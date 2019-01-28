import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocsContentPageModule } from './components/docs-content-page/docs-content-page.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DocsContentPageComponent } from './components/docs-content-page/docs-content-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TocComponent } from './components/toc/toc.component';
import { TokenTableComponent } from './components/token-table/token-table.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CacheService } from './shared/cache.service';
import { SafeHtmlPipe } from './shared/safeHtml.pipe';
import { SfFullWidthComponent } from './components/sf-full-width/sf-full-width.component';
import { SfTwoColumnComponent } from './components/sf-two-column/sf-two-column.component';
import { SfTwoColTextImageComponent } from './components/sf-two-col-text-image/sf-two-col-text-image.component';
import { CoreContentPageComponent } from './components/core-content-page/core-content-page.component';
import { CmsPageComponent } from './components/cms-page/cms-page.component';
import { SidebarCmsComponent } from './components/sidebar-cms/sidebar-cms.component';
import { CodePageComponent } from './components/code-page/code-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { FeedbackWidgetModule } from './components/feedback-widget/feedback-widget.module';
import { FeedbackWidgetComponent } from './components/feedback-widget/feedback-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DocsContentPageComponent,
    SidebarComponent,
    TocComponent,
    TokenTableComponent,
    PageNotFoundComponent,
    LandingPageComponent,
    SafeHtmlPipe,
    SfFullWidthComponent,
    SfTwoColumnComponent,
    SfTwoColTextImageComponent,
    CoreContentPageComponent,
    CmsPageComponent,
    SidebarCmsComponent,
    CodePageComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DocsContentPageModule,
    BrowserAnimationsModule,
    InlineSVGModule.forRoot(),
    FormsModule,
    FeedbackWidgetModule
  ],
  providers: [CacheService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
