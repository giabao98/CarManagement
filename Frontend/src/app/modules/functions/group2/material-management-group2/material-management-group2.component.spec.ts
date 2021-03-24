import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialManagementGroup2Component } from './material-management-group2.component';

describe('MaterialManagementGroup2Component', () => {
  let component: MaterialManagementGroup2Component;
  let fixture: ComponentFixture<MaterialManagementGroup2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialManagementGroup2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialManagementGroup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
