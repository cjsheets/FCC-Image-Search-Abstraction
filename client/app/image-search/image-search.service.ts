import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ImageSearchService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

 // getImageResults(searchQuery: string): Promise<[{}]> {
  getImageResults(searchQuery: string) {
      console.log(searchQuery);
      return this.http.get(searchQuery)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }

//  private handleError(error: any): Promise<any> {
  handleError(error) {
    console.error('An error occurred - image-search.service', error); // Needs to be improved
    return Promise.reject(error.message || error);
  }
 }