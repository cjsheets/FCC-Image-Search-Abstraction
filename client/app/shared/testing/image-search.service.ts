
import { ImageSearchService } from '../../image-search/image-search.service';
import { Headers } from '@angular/http';

export class FakeImageSearchService extends ImageSearchService {

  lastPromise: Promise<any>;

  handleError(error) { return Promise.reject(''); }

  getImageResults(searchQuery: string) {
      console.log(searchQuery);
      return this.lastPromise = Promise.resolve([
        {"url":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/June_odd-eyed-cat.jpg/737px-June_odd-eyed-cat.jpg","thumbnail":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSjVg5YLZVi3X90LCxKz7Rf50f1_JTeZGGEAQO3IL1C3xxZPtvXmUhmCm8","context":"https://en.wikipedia.org/wiki/File:June_odd-eyed-cat.jpg","snippet":"This image was previously a featured picture, but community consensus \ndetermined that it no longer meets our featured-picture criteria. If you have a ..."},
        {"url":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Mice-burying-the-cat.jpg/800px-Mice-burying-the-cat.jpg","thumbnail":"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSjc8i3YFobGI99cc7mDbq_VMj3fdQgzdcvmR56i6RhreHNJGRgNFvDIV7J","context":"https://commons.wikimedia.org/wiki/File:Mice-burying-the-cat.jpg","snippet":"Sep 26, 2016 ... English: \"The Mice are burying the Cat\". An 18th-century Russian lubok print with \na very popular plot, that of the mice burying the cat."}
      ]);
  }
 }