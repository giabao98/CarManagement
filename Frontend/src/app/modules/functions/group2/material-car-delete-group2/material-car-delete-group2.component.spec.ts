import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCarDeleteGroup2Component } from './material-car-delete-group2.component';

describe('MaterialCarDeleteGroup2Component', () => {
  let component: MaterialCarDeleteGroup2Component;
  let fixture: ComponentFixture<MaterialCarDeleteGroup2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialCarDeleteGroup2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCarDeleteGroup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
