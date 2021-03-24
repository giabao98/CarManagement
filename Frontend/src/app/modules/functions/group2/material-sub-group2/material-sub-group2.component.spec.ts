import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSubGroup2Component } from './material-sub-group2.component';

describe('MaterialSubGroup2Component', () => {
  let component: MaterialSubGroup2Component;
  let fixture: ComponentFixture<MaterialSubGroup2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialSubGroup2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSubGroup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
