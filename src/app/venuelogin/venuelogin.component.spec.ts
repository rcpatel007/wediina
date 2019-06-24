import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueloginComponent } from './venuelogin.component';

describe('VenueloginComponent', () => {
  let component: VenueloginComponent;
  let fixture: ComponentFixture<VenueloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
