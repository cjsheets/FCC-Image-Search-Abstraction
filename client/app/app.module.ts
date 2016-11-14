import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }