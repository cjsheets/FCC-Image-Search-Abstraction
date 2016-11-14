import { TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [SidebarComponent]});
  });
  it ('should work', () => {
    let fixture = TestBed.createComponent(SidebarComponent);
    expect(fixture.componentInstance instanceof SidebarComponent).toBe(true, 'should create SidebarComponent');
  });
});