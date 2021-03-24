import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCarDeleteComponent } from './material-car-delete.component';

describe('MaterialCarDeleteComponent', () => {
  let component: MaterialCarDeleteComponent;
  let fixture: ComponentFixture<MaterialCarDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialCarDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCarDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
