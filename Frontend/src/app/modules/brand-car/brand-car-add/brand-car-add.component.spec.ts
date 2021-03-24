import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCarAddComponent } from './brand-car-add.component';

describe('BrandCarAddComponent', () => {
  let component: BrandCarAddComponent;
  let fixture: ComponentFixture<BrandCarAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandCarAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandCarAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
