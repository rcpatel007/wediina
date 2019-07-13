import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderregisterComponent } from './venderregister.component';

describe('VenderregisterComponent', () => {
  let component: VenderregisterComponent;
  let fixture: ComponentFixture<VenderregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenderregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
