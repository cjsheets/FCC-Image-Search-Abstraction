import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let JSON = [
      {name: 'Cat Search Result'}
    ];
    return {JSON};
  }
}