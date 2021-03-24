import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSubComponent } from './material-sub.component';

describe('MaterialSubComponent', () => {
  let component: MaterialSubComponent;
  let fixture: ComponentFixture<MaterialSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
