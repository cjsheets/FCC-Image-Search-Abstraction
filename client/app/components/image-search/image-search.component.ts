import { Component, OnInit } from '@angular/core';
import { ImageSearchService } from './image-search.service';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.view.html',
  styleUrls: ['./image-search.view.css'],
  providers: [ ImageSearchService ]
})

export class ImageSearchComponent implements OnInit {
  searchQuery: string = '';
  responseJSON: [{}];
  responseLoading: boolean = false;

  constructor(private imageSearchService: ImageSearchService) { }

  searchButtonClicked(searchTerm: string): void {
    this.responseLoading = true;
    this.getImageSearchResults();
  }

  getImageSearchResults(): void {
    this.imageSearchService.getImageResults(this.searchQuery)
      .then(response => {
        console.log(response);
        this.responseJSON = response;
        this.responseLoading = false;
      })
      .catch(this.handleError);
  }

  jsonToString(json: {}): string {
    return JSON.stringify(json);
  }

  clearResponseJSON(): void {
    this.responseJSON = [{}];
  }

  ngOnInit(): void {
    // this.getImageSearchResults();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred - image-search.component', error); // Needs to be improved
    return Promise.reject(error.message || error);
  }
 }