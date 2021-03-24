import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCarViewGroup4Component } from './schedule-car-view-group4.component';

describe('ScheduleCarViewGroup4Component', () => {
    let component: ScheduleCarViewGroup4Component;
    let fixture: ComponentFixture<ScheduleCarViewGroup4Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScheduleCarViewGroup4Component]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScheduleCarViewGroup4Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
