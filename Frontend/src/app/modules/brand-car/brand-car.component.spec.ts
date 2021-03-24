import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCarComponent } from './brand-car.component';

describe('BrandCarComponent', () => {
  let component: BrandCarComponent;
  let fixture: ComponentFixture<BrandCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
