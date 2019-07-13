import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderDetailComponent } from './vender-detail.component';

describe('VenderDetailComponent', () => {
  let component: VenderDetailComponent;
  let fixture: ComponentFixture<VenderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
