import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { routing } from './app.routing';
import { CacheService } from './shared/cache.service';
import { HomeComponent } from './components/home/home.component';
import { ElementPageComponent } from './components/element-page/element-page.component';
import { BlockPageComponent } from './components/block-page/block-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CoreContentPageComponent } from './components/core-content-page/core-content-page.component';
import { DocsContentPageComponent } from './components/docs-content-page/docs-content-page.component';
import { SidebarNavComponent } from './components/sidebar-nav/sidebar-nav.component';
import { SidebarNavCodeComponent } from './components/sidebar-nav-code/sidebar-nav-code.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FullWidthComponent } from './components/sf-full-width/sf-full-width.component';
import { TwoColumnComponent } from './components/sf-two-column/sf-two-column.component';
import { TwoColTextImageComponent } from './components/sf-two-col-text-image/sf-two-col-text-image.component';
import { TokenTableComponent } from './components/token-table/token-table.component';
import { ModifiersTableComponent } from './components/modifiers-table/modifiers-table.component';
import { TypesComponent } from './components/types/types.component';
import { BlogLandingPageComponent } from './components/blog-landing-page/blog-landing-page.component';
import { BlogPostPageComponent } from './components/blog-post-page/blog-post-page.component';
import { AppSettings } from './app.settings';
import { FooterComponent } from './components/footer/footer.component';
import { QuestionWidgetComponent } from './components/question-widget/question-widget.component';
import { RoleWidgetComponent } from './components/role-widget/role-widget.component';

import { InlineSVGModule } from 'ng-inline-svg';
import { SafeHtmlPipe } from './shared/safeHtml.pipe';
import { LoadingBarModule } from '@ngx-loading-bar/core';

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
    SidebarNavCodeComponent,
    HeaderComponent,
    PageNotFoundComponent,
    FullWidthComponent,
    TwoColumnComponent,
    TwoColTextImageComponent,
    SafeHtmlPipe,
    TokenTableComponent,
    ModifiersTableComponent,
    TypesComponent,
    BlogLandingPageComponent,
    BlogPostPageComponent,
    FooterComponent,
    QuestionWidgetComponent,
    RoleWidgetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InlineSVGModule,
    routing,
    LoadingBarModule.forRoot()
  ],
  entryComponents: [],
  providers: [CacheService, AppSettings],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
