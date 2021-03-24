import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDeleteGroup2Component } from './material-delete-group2.component';

describe('MaterialDeleteGroup2Component', () => {
  let component: MaterialDeleteGroup2Component;
  let fixture: ComponentFixture<MaterialDeleteGroup2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialDeleteGroup2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDeleteGroup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
