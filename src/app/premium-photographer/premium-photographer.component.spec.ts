import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumPhotographerComponent } from './premium-photographer.component';

describe('PremiumPhotographerComponent', () => {
  let component: PremiumPhotographerComponent;
  let fixture: ComponentFixture<PremiumPhotographerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumPhotographerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumPhotographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
