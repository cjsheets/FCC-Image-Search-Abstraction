/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { By }           from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { AppModule } from '../app.module';
import { ImageSearchComponent } from './image-search.component';
import { ImageSearchService } from './image-search.service';
import { FakeImageSearchService } from '../shared/testing/image-search.service';

describe('ImageSearchComponent', () => {
  let comp:    ImageSearchComponent;
  let fixture: ComponentFixture<ImageSearchComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  let imageSearchService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        {provide: ImageSearchService, useClass: FakeImageSearchService },
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSearchComponent);

    comp = fixture.componentInstance; // ImageSearchComponent test instance

    // imageSearchService from the root injector
    imageSearchService = TestBed.get(ImageSearchService);

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('#i5'));
    el = de.nativeElement;
  });

  // Was our component created successfully?
  it('should have a defined component', () => {
      expect(comp).toBeDefined();
  });

  it('should create two `FormControl`s', () => {
    comp.ngOnInit();
    expect(comp.searchControl instanceof FormControl).toBe(true);
    expect(comp.offsetControl instanceof FormControl).toBe(true);
  });

  // it('should not show quote before OnInit', () => {
  //   comp.ngOnInit();
  //   comp.searchControl.setValue('Test');
  //   comp.getImageSearchResults();
  //   expect(comp.responseJSON).toEqual('test');
  // });
});