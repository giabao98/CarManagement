import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCarEditGroup9Component } from './brand-car-edit-group9.component';

describe('BrandCarEditGroup9Component', () => {
  let component: BrandCarEditGroup9Component;
  let fixture: ComponentFixture<BrandCarEditGroup9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandCarEditGroup9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandCarEditGroup9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
