import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  prePageTitle: string = 'fcc.';
  pageTitle: string = 'ChadSheets';
  postPageTitle: string = '.com';
 }