import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Development and debugging interface: in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ImageSearchService } from './components/image-search/image-search.service';
import { ImageSearchComponent } from './components/image-search/image-search.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
//    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ImageSearchComponent
  ],
  providers: [ ImageSearchService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }