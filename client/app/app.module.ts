import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
