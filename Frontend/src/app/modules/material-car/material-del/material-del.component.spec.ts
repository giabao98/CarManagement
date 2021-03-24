import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDelComponent } from './material-del.component';

describe('MaterialDelComponent', () => {
  let component: MaterialDelComponent;
  let fixture: ComponentFixture<MaterialDelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialDelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
