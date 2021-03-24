import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDenyRoadGroup4 } from './modal-deny-road-group4.component';

describe('ModalDenyRoadGroup4', () => {
    let component: ModalDenyRoadGroup4;
    let fixture: ComponentFixture<ModalDenyRoadGroup4>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalDenyRoadGroup4]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalDenyRoadGroup4);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
