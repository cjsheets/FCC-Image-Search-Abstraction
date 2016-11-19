import { Component, OnInit } from '@angular/core';
import { ImageSearchService } from './image-search.service';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.view.html',
  styleUrls: ['./image-search.view.css'],
  providers: [ ImageSearchService ]
})

export class ImageSearchComponent implements OnInit {
  searchQuery: string = 'cats';
  responseJSON: [{}];
  responseLoading: boolean = true;

  constructor(private imageSearchService: ImageSearchService) { }

  searchButtonClicked(searchTerm: string): void {
    this.responseLoading = true;;
  }

  getImageSearchResults(): void {
    this.imageSearchService.getImageResults()
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

  ngOnInit(): void {
    this.getImageSearchResults();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred - image-search.component', error); // Needs to be improved
    return Promise.reject(error.message || error);
  }
 }