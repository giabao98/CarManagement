import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCarEditComponent } from './brand-car-edit.component';

describe('BrandCarEditComponent', () => {
  let component: BrandCarEditComponent;
  let fixture: ComponentFixture<BrandCarEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandCarEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandCarEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
