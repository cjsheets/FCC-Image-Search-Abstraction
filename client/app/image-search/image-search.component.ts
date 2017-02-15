import { Component, OnInit } from '@angular/core';
import { ImageSearchService } from './image-search.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'image-search',
  templateUrl: './image-search.view.html',
  styleUrls: ['./image-search.view.scss'],
  providers: [ ImageSearchService ]
})

export class ImageSearchComponent implements OnInit {
  // API destinations
  private imageSearchURL = 'api/search?t=';
  private latestURL = 'api/latest';
  apiCallString: string = 'http://' + document.domain + '/' + this.imageSearchURL;
  // Form Elements
  searchControl: FormControl
  offsetControl: FormControl
  // Result output placeholders
  responseJSON: [{}];
  latestJSON: [{}];
  responseLoading: boolean = false;
  latestLoading: boolean = false;

  constructor(
    private imageSearchService: ImageSearchService
  ) {}

  ngOnInit(): void {
    // this.getImageSearchResults();
    this.buildForm();
    this.offsetControl.valueChanges.subscribe(value => {
      this.validateOffset();
    });
    this.latestLoading = true;
    this.getLatestSearches();
  }
  
  buildForm() {
    this.searchControl = new FormControl;
    this.offsetControl = new FormControl;
  }

  getImageSearchResults(): void {
    this.responseLoading = true;
    if(this.searchControl.value) {
      let queryString = (this.offsetControl.value > 0) ? 
        this.searchControl.value + '&o=' + this.offsetControl.value : this.searchControl.value;
      this.imageSearchService.getImageResults(this.imageSearchURL + queryString)
        .then(response => {
          console.log(response);
          this.responseJSON = response;
          this.responseLoading = false;
          this.getLatestSearches();
        })
        .catch(this.handleError);
    } else {

    }
  }

  getLatestSearches(): void {
    this.imageSearchService.getImageResults(this.latestURL)
      .then(response => {
        this.latestJSON = response;
        this.latestLoading = false;
        console.log(response);
      })
  }

  validateOffset(newOffset ?: number): void {
    let offset = newOffset || this.offsetControl.value;
    offset = (offset > 0) ? offset : null;
    this.offsetControl.setValue(offset);
  }

  incrementOffset(): void {
    let offset = this.offsetControl.value;
    this.validateOffset((offset) ? offset + 1 : 1);
  }

  decrementOffset(): void {
    let offset = this.offsetControl.value;
    this.validateOffset((offset) ? offset - 1 : 0);
  }

  jsonToString(json: {}): string {
    return JSON.stringify(json);
  }

  clearResponseJSON(): void {
    this.responseJSON = [{}];
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred - image-search.component', error); // Needs to be improved
    return Promise.reject(error.message || error);
  }
 }