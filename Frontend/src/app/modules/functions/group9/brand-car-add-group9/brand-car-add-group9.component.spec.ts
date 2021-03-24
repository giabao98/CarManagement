import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCarAddGroup9Component } from './brand-car-add-group9.component';

describe('BrandCarAddGroup9Component', () => {
  let component: BrandCarAddGroup9Component;
  let fixture: ComponentFixture<BrandCarAddGroup9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandCarAddGroup9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandCarAddGroup9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
