import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCarComponent } from './material-car.component';

describe('MaterialCarComponent', () => {
  let component: MaterialCarComponent;
  let fixture: ComponentFixture<MaterialCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
