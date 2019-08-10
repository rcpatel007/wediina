import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumPhotographerDetailComponent } from './premium-photographer-detail.component';

describe('PremiumPhotographerDetailComponent', () => {
  let component: PremiumPhotographerDetailComponent;
  let fixture: ComponentFixture<PremiumPhotographerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumPhotographerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumPhotographerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
