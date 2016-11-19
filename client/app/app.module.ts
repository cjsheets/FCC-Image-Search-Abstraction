import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ImageSearchComponent } from './components/image-search/image-search.component';
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ImageSearchComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }