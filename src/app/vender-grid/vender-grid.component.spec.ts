import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderGridComponent } from './vender-grid.component';

describe('VenderGridComponent', () => {
  let component: VenderGridComponent;
  let fixture: ComponentFixture<VenderGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenderGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
