import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialAddGroup2Component } from './material-add-group2.component';

describe('MaterialAddGroup2Component', () => {
  let component: MaterialAddGroup2Component;
  let fixture: ComponentFixture<MaterialAddGroup2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialAddGroup2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialAddGroup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
