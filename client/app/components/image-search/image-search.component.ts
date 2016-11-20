import { Component, OnInit } from '@angular/core';
import { ImageSearchService } from './image-search.service';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.view.html',
  styleUrls: ['./image-search.view.css'],
  providers: [ ImageSearchService ]
})

export class ImageSearchComponent implements OnInit {

  private imageSearchURL = 'api/search?t=';
  searchQuery: string = '';
  searchOffset: number;
  queryString: string = '';
  apiCallString: string = 'http://' + document.domain + '/' + this.imageSearchURL;
  responseJSON: [{}];
  responseLoading: boolean = false;

  constructor(private imageSearchService: ImageSearchService) { }

  searchButtonClicked(searchTerm: string): void {
    this.responseLoading = true;
    this.getImageSearchResults();
  }

  getImageSearchResults(): void {
    if(this.searchQuery) {
      this.queryString = (this.searchOffset > 0) ? 
        this.searchQuery + '&o=' + this.searchOffset : this.searchQuery;
      this.imageSearchService.getImageResults(this.imageSearchURL + this.queryString)
        .then(response => {
          console.log(response);
          this.responseJSON = response;
          this.responseLoading = false;
        })
        .catch(this.handleError);
    } else {

    }
  }

  jsonToString(json: {}): string {
    return JSON.stringify(json);
  }

  clearResponseJSON(): void {
    this.responseJSON = [{}];
  }

  changeOffset(): void {
    this.searchOffset = (this.searchOffset > 0) ? this.searchOffset : null;
  }

  incrementOffset(): void {
    this.searchOffset = (this.searchOffset) ? this.searchOffset + 1 : 1;
    this.changeOffset();
  }

  decrementOffset(): void {
    this.searchOffset = this.searchOffset - 1;
    this.changeOffset();
  }

  ngOnInit(): void {
    // this.getImageSearchResults();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred - image-search.component', error); // Needs to be improved
    return Promise.reject(error.message || error);
  }
 }