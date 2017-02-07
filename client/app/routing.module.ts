import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ImageSearchComponent } from './image-search/image-search.component';

// Save space in the root module, export components here
export const routedComponents = [
  AppComponent,
  ImageSearchComponent
];

const routes: Routes = [
  { path: '', component: ImageSearchComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }