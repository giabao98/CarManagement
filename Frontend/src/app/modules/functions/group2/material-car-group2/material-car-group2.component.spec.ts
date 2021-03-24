import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCarGroup2Component } from './material-car-group2.component';

describe('MaterialCarGroup2Component', () => {
  let component: MaterialCarGroup2Component;
  let fixture: ComponentFixture<MaterialCarGroup2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialCarGroup2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCarGroup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
