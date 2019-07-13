import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueGridComponent } from './venue-grid.component';

describe('VenueGridComponent', () => {
  let component: VenueGridComponent;
  let fixture: ComponentFixture<VenueGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
