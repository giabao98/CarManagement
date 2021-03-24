import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCarManagementGroup9Component } from './brand-car-management-group9.component';

describe('BrandCarManagementGroup9Component', () => {
  let component: BrandCarManagementGroup9Component;
  let fixture: ComponentFixture<BrandCarManagementGroup9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandCarManagementGroup9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandCarManagementGroup9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
